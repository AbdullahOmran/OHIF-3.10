import React, { useState, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import qs from 'query-string';
import isEqual from 'lodash.isequal';
import { useTranslation } from 'react-i18next';
//
import filtersMeta from './filtersMeta.js';
import { useAppConfig } from '@state';
import { useDebounce, useSearchParams } from '@hooks';
import { utils } from '@ohif/core';
import { Label } from '../../components/Label.tsx';

import {
  StudyListExpandedRow,
  EmptyStudies,
  StudyListTable,
  StudyListPagination,
  StudyListFilter,
  useSessionStorage,
  InvestigationalUseDialog,
  Button,
  ButtonEnums,
} from '@ohif/ui';

import {
  Header,
  Icons,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Clipboard,
  useModal,
  Onboarding,
  ScrollArea,
} from '@ohif/ui-next';

import { Types } from '@ohif/ui';

import { preserveQueryParameters, preserveQueryStrings } from '../../utils/preserveQueryParameters';

import { useLocation } from 'react-router-dom';

const PatientInfoVisibility = Types.PatientInfoVisibility;

const { sortBySeriesDate } = utils;

const seriesInStudiesMap = new Map();

/**
 * Enhanced WorkList with improved filtering and diagnosis search
 */
function WorkList({
  data: studies,
  dataTotal: studiesTotal,
  isLoadingData,
  dataSource,
  hotkeysManager,
  dataPath,
  onRefresh,
  servicesManager,
  onFilterChange, // New prop to handle filter changes at parent level
}: withAppTypes) {
  const location = useLocation();
  console.log('STARTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
  console.log('Current location:', location.pathname);

  // Debug: Log initial props and filter values
  console.log('WorkList Props:', {
    studiesLength: studies?.length,
    studiesTotal,
    isLoadingData,
    dataPath,
  });

  const { hotkeyDefinitions, hotkeyDefaults } = hotkeysManager;
  const { show, hide } = useModal();
  const { t } = useTranslation();
  // ~ Modes
  const [appConfig] = useAppConfig();
  // ~ Filters
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const STUDIES_LIMIT = 101;
  const queryFilterValues = _getQueryFilterValues(searchParams);
  const [sessionQueryFilterValues, updateSessionQueryFilterValues] = useSessionStorage({
    key: 'queryFilterValues',
    defaultValue: queryFilterValues,
    clearOnUnload: true,
  });
  const [filterValues, _setFilterValues] = useState({
    ...defaultFilterValues,
    ...sessionQueryFilterValues,
  });
  console.log('Initial filterValues:', filterValues);
  const debouncedFilterValues = useDebounce(filterValues, 200);
  // Debug: Log debounced filter values
  console.log('Debounced filterValues:', debouncedFilterValues);

  const { resultsPerPage, pageNumber, sortBy, sortDirection } = filterValues;

  /*
   * The default sort value keep the filters synchronized with runtime conditional sorting
   * Only applied if no other sorting is specified and there are less than 101 studies
   */
  const canSort = studiesTotal < STUDIES_LIMIT;
  const shouldUseDefaultSort = sortBy === '' || !sortBy;
  const sortModifier = sortDirection === 'descending' ? 1 : -1;
  const defaultSortValues =
    shouldUseDefaultSort && canSort ? { sortBy: 'studyDate', sortDirection: 'ascending' } : {};
  const { customizationService } = servicesManager.services;

  // Client-side filtering for studies (fallback if server-side filtering isn't working)
  const filteredStudies = useMemo(() => {
    // Debug: Log studies and filter criteria before filtering
    console.log('Studies before filtering:', studies);
    console.log('Filter criteria:', {
      patientName: filterValues.patientName,
      mrn: filterValues.mrn,
      description: filterValues.description,
      diagnosis: filterValues.diagnosis,
      accession: filterValues.accession,
      modalities: filterValues.modalities,
      studyDate: filterValues.studyDate,
    });

    if (!studies || studies.length === 0) {
      console.log('No studies to filter');
      return [];
    }

    const filtered = studies.filter(study => {
      // Patient Name filter
      if (filterValues.patientName && filterValues.patientName.trim()) {
        const patientNameMatch =
          study.patientName &&
          study.patientName.toLowerCase().includes(filterValues.patientName.toLowerCase().trim());
        console.log('PatientName filter:', {
          studyPatientName: study.patientName,
          filterPatientName: filterValues.patientName,
          patientNameMatch,
        });
        if (!patientNameMatch) {
          return false;
        }
      }

      // MRN filter
      if (filterValues.mrn && filterValues.mrn.trim()) {
        const mrnMatch =
          study.mrn && study.mrn.toLowerCase().includes(filterValues.mrn.toLowerCase().trim());
        console.log('MRN filter:', {
          studyMrn: study.mrn,
          filterMrn: filterValues.mrn,
          mrnMatch,
        });
        if (!mrnMatch) {
          return false;
        }
      }

      // Description filter (this often contains diagnosis information)
      if (filterValues.description && filterValues.description.trim()) {
        const descriptionMatch =
          study.description &&
          study.description.toLowerCase().includes(filterValues.description.toLowerCase().trim());
        console.log('Description filter:', {
          studyDescription: study.description,
          filterDescription: filterValues.description,
          descriptionMatch,
        });
        if (!descriptionMatch) {
          return false;
        }
      }

      // Diagnosis filter (new field)
      if (filterValues.diagnosis && filterValues.diagnosis.trim()) {
        const diagnosisText = filterValues.diagnosis.toLowerCase().trim();
        const diagnosisMatch =
          (study.diagnosis && study.diagnosis.toLowerCase().includes(diagnosisText)) ||
          (study.description && study.description.toLowerCase().includes(diagnosisText)) ||
          (study.studyDescription &&
            study.studyDescription.toLowerCase().includes(diagnosisText)) ||
          (study.clinicalInfo && study.clinicalInfo.toLowerCase().includes(diagnosisText));
        console.log('Diagnosis filter:', {
          studyDiagnosis: study.diagnosis,
          studyDescription: study.description,
          studyStudyDescription: study.studyDescription,
          studyClinicalInfo: study.clinicalInfo,
          filterDiagnosis: filterValues.diagnosis,
          diagnosisMatch,
        });
        if (!diagnosisMatch) {
          return false;
        }
      }

      // Accession filter
      if (filterValues.accession && filterValues.accession.trim()) {
        const accessionMatch =
          study.accession &&
          study.accession.toLowerCase().includes(filterValues.accession.toLowerCase().trim());
        console.log('Accession filter:', {
          studyAccession: study.accession,
          filterAccession: filterValues.accession,
          accessionMatch,
        });
        if (!accessionMatch) {
          return false;
        }
      }

      // Modalities filter
      if (filterValues.modalities && filterValues.modalities.length > 0) {
        const studyModalities = study.modalities ? study.modalities.split(/[\/\\,]/) : [];
        const hasMatchingModality = filterValues.modalities.some(filterModality =>
          studyModalities.some(
            studyModality => studyModality.trim().toLowerCase() === filterModality.toLowerCase()
          )
        );
        console.log('Modalities filter:', {
          studyModalities,
          filterModalities: filterValues.modalities,
          hasMatchingModality,
        });
        if (!hasMatchingModality) {
          return false;
        }
      }

      // Date range filter
      if (filterValues.studyDate.startDate || filterValues.studyDate.endDate) {
        if (study.date) {
          const studyDate = moment(study.date, ['YYYYMMDD', 'YYYY.MM.DD'], true);
          if (studyDate.isValid()) {
            let dateMatch = true;
            if (filterValues.studyDate.startDate) {
              const startDate = moment(filterValues.studyDate.startDate);
              dateMatch = dateMatch && !studyDate.isBefore(startDate, 'day');
            }
            if (filterValues.studyDate.endDate) {
              const endDate = moment(filterValues.studyDate.endDate);
              dateMatch = dateMatch && !studyDate.isAfter(endDate, 'day');
            }
            console.log('StudyDate filter:', {
              studyDate: study.date,
              filterStartDate: filterValues.studyDate.startDate,
              filterEndDate: filterValues.studyDate.endDate,
              dateMatch,
            });
            if (!dateMatch) {
              return false;
            }
          }
        }
      }

      return true;
    });

    // Debug: Log filtered studies
    console.log('Filtered studies:', filtered);
    return filtered;
  }, [studies, filterValues]);

  const sortedStudies = useMemo(() => {
    const validStudies = filteredStudies.filter(study => {
      const { modalities } = study;
      const validToOpen = appConfig.loadedModes[0].isValidMode({
        modalities: modalities.replaceAll('/', '\\'),
        study,
      }).valid;
      return validToOpen;
    });

    if (!canSort) {
      return validStudies;
    }

    const sorted = [...validStudies].sort((s1, s2) => {
      if (shouldUseDefaultSort) {
        const ascendingSortModifier = -1;
        return _sortStringDates(s1, s2, ascendingSortModifier);
      }

      const s1Prop = s1[sortBy];
      const s2Prop = s2[sortBy];

      if (typeof s1Prop === 'string' && typeof s2Prop === 'string') {
        return s1Prop.localeCompare(s2Prop) * sortModifier;
      } else if (typeof s1Prop === 'number' && typeof s2Prop === 'number') {
        return (s1Prop > s2Prop ? 1 : -1) * sortModifier;
      } else if (!s1Prop && s2Prop) {
        return -1 * sortModifier;
      } else if (!s2Prop && s1Prop) {
        return 1 * sortModifier;
      } else if (sortBy === 'studyDate') {
        return _sortStringDates(s1, s2, sortModifier);
      }

      return 0;
    });

    // Debug: Log sorted studies
    console.log('Sorted studies:', sorted);
    return sorted;
  }, [canSort, filteredStudies, shouldUseDefaultSort, sortBy, sortModifier]);

  // ~ Rows & Studies
  const [expandedRows, setExpandedRows] = useState([]);
  const [studiesWithSeriesData, setStudiesWithSeriesData] = useState([]);
  const numOfStudies = sortedStudies.length; // Use filtered count
  const querying = useMemo(() => {
    return isLoadingData || expandedRows.length > 0;
  }, [isLoadingData, expandedRows]);

  const setFilterValues = val => {
    if (filterValues.pageNumber === val.pageNumber) {
      val.pageNumber = 1;
    }
    _setFilterValues(val);
    updateSessionQueryFilterValues(val);
    setExpandedRows([]);

    // Debug: Log filter value changes
    console.log('Filter values updated:', val);

    // Notify parent component about filter changes for server-side filtering
    if (onFilterChange && typeof onFilterChange === 'function') {
      onFilterChange(val);
    }
  };

  const onPageNumberChange = newPageNumber => {
    const oldPageNumber = filterValues.pageNumber;
    const rollingPageNumberMod = Math.floor(101 / filterValues.resultsPerPage);
    const rollingPageNumber = oldPageNumber % rollingPageNumberMod;
    const isNextPage = newPageNumber > oldPageNumber;
    const hasNextPage = Math.max(rollingPageNumber, 1) * resultsPerPage < numOfStudies;

    if (isNextPage && !hasNextPage) {
      return;
    }

    setFilterValues({ ...filterValues, pageNumber: newPageNumber });
  };

  const onResultsPerPageChange = newResultsPerPage => {
    setFilterValues({
      ...filterValues,
      pageNumber: 1,
      resultsPerPage: Number(newResultsPerPage),
    });
  };

  // Set body style
  useEffect(() => {
    document.body.classList.add('bg-black');
    return () => {
      document.body.classList.remove('bg-black');
    };
  }, []);

  // Sync URL query parameters with filters
  useEffect(() => {
    if (!debouncedFilterValues) {
      return;
    }

    const queryString = {};
    Object.keys(defaultFilterValues).forEach(key => {
      const defaultValue = defaultFilterValues[key];
      const currValue = debouncedFilterValues[key];

      // TODO: nesting/recursion?
      if (key === 'studyDate') {
        if (currValue.startDate && defaultValue.startDate !== currValue.startDate) {
          queryString.startDate = currValue.startDate;
        }
        if (currValue.endDate && defaultValue.endDate !== currValue.endDate) {
          queryString.endDate = currValue.endDate;
        }
      } else if (key === 'modalities' && currValue.length) {
        queryString.modalities = currValue.join(',');
      } else if (currValue !== defaultValue) {
        queryString[key] = currValue;
      }
    });

    preserveQueryStrings(queryString);

    const search = qs.stringify(queryString, {
      skipNull: true,
      skipEmptyString: true,
    });
    navigate({
      pathname: '/study-list',
      search: search ? `?${search}` : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilterValues]);

  // Query for series information
  useEffect(() => {
    const fetchSeries = async studyInstanceUid => {
      try {
        const series = await dataSource.query.series.search(studyInstanceUid);
        seriesInStudiesMap.set(studyInstanceUid, sortBySeriesDate(series));
        setStudiesWithSeriesData([...studiesWithSeriesData, studyInstanceUid]);
      } catch (ex) {
        // TODO: UI Notification Service
        console.log(ex);
      }
    };

    // TODO: WHY WOULD YOU USE AN INDEX OF 1?!
    // Note: expanded rows index begins at 1
    for (let z = 0; z < expandedRows.length; z++) {
      const expandedRowIndex = expandedRows[z] - 1;
      const studyInstanceUid = sortedStudies[expandedRowIndex].studyInstanceUid;

      if (studiesWithSeriesData.includes(studyInstanceUid)) {
        continue;
      }

      fetchSeries(studyInstanceUid);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedRows, sortedStudies]);

  const isFiltering = (filterValues, defaultFilterValues) => {
    return !isEqual(filterValues, defaultFilterValues);
  };

  const rollingPageNumberMod = Math.floor(101 / resultsPerPage);
  const rollingPageNumber = (pageNumber - 1) % rollingPageNumberMod;
  const offset = resultsPerPage * rollingPageNumber;
  const offsetAndTake = offset + resultsPerPage;

  // Debug: Log studies for table data source
  console.log('Studies for tableDataSource:', sortedStudies.slice(offset, offsetAndTake));

  const tableDataSource = sortedStudies.map((study, key) => {
    const rowKey = key + 1;
    const isExpanded = expandedRows.some(k => k === rowKey);
    const {
      studyInstanceUid,
      accession,
      modalities,
      instances,
      description,
      mrn,
      patientName,
      date,
      time,
    } = study;

    console.log('Study: ', study);

    const classification = null;

    const studyDate =
      date &&
      moment(date, ['YYYYMMDD', 'YYYY.MM.DD'], true).isValid() &&
      moment(date, ['YYYYMMDD', 'YYYY.MM.DD']).format(t('Common:localDateFormat', 'MMM-DD-YYYY'));
    const studyTime =
      time &&
      moment(time, ['HH', 'HHmm', 'HHmmss', 'HHmmss.SSS']).isValid() &&
      moment(time, ['HH', 'HHmm', 'HHmmss', 'HHmmss.SSS']).format(
        t('Common:localTimeFormat', 'hh:mm A')
      );

    const makeCopyTooltipCell = textValue => {
      if (!textValue) {
        return '';
      }
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-pointer truncate">{textValue}</span>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="flex items-center justify-between gap-2">
              {textValue}
              <Clipboard>{textValue}</Clipboard>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    };

    return {
      dataCY: `studyRow-${studyInstanceUid}`,
      clickableCY: studyInstanceUid,
      row: [
        {
          key: 'ClassificationLabel',
          content: classification ? (
            <Label type={classification}>{classification}</Label>
          ) : (
            <Label type={'error'}>{'error'}</Label>
          ),
          gridCol: 4,
        },
        {
          key: 'patientName',
          content: patientName ? makeCopyTooltipCell(patientName) : null,
          gridCol: 4,
        },
        {
          key: 'mrn',
          content: makeCopyTooltipCell(mrn),
          gridCol: 3,
        },
        {
          key: 'studyDate',
          content: (
            <>
              {studyDate && <span className="mr-4">{studyDate}</span>}
              {studyTime && <span>{studyTime}</span>}
            </>
          ),
          title: `${studyDate || 'studyDate'} ${studyTime || 'studyTime'}`,
          gridCol: 5,
        },
        {
          key: 'description',
          content: makeCopyTooltipCell(description),
          gridCol: 4,
        },
      ],
      expandedContent: (
        <StudyListExpandedRow
          seriesTableColumns={{
            description: t('StudyList:Description'),
            seriesNumber: t('StudyList:Series'),
            modality: t('StudyList:Modality'),
            instances: t('StudyList:Instances'),
          }}
          seriesTableDataSource={
            seriesInStudiesMap.has(studyInstanceUid)
              ? seriesInStudiesMap.get(studyInstanceUid).map(s => {
                  return {
                    description: s.description || '(empty)',
                    seriesNumber: s.seriesNumber ?? '',
                    modality: s.modality || '',
                    instances: s.numSeriesInstances || '',
                  };
                })
              : []
          }
        >
          <div className="flex flex-row gap-2">
            {(appConfig.groupEnabledModesFirst
              ? appConfig.loadedModes.sort((a, b) => {
                  const isValidA = a.isValidMode({
                    modalities: modalities.replaceAll('/', '\\'),
                    study,
                  }).valid;
                  const isValidB = b.isValidMode({
                    modalities: modalities.replaceAll('/', '\\'),
                    study,
                  }).valid;

                  return isValidB - isValidA;
                })
              : appConfig.loadedModes
            ).map((mode, i) => {
              const modalitiesToCheck = modalities.replaceAll('/', '\\');

              const { valid: isValidMode, description: invalidModeDescription } = mode.isValidMode({
                modalities: modalitiesToCheck,
                study,
              });

              const query = new URLSearchParams();
              if (filterValues.configUrl) {
                query.append('configUrl', filterValues.configUrl);
              }
              query.append('StudyInstanceUIDs', studyInstanceUid);
              preserveQueryParameters(query);

              return (
                mode.displayName && (
                  <Link
                    className={isValidMode ? '' : 'cursor-not-allowed'}
                    key={i}
                    to={`${mode.routeName}${dataPath || ''}?${query.toString()}`}
                    onClick={event => {
                      if (!isValidMode) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <Button
                      type={ButtonEnums.type.primary}
                      size={ButtonEnums.size.medium}
                      disabled={!isValidMode}
                      startIconTooltip={
                        !isValidMode ? (
                          <div className="font-inter flex w-[206px] whitespace-normal text-left text-xs font-normal text-white">
                            {invalidModeDescription}
                          </div>
                        ) : null
                      }
                      startIcon={
                        isValidMode ? (
                          <Icons.LaunchArrow className="!h-[20px] !w-[20px] text-black" />
                        ) : (
                          <Icons.LaunchInfo className="!h-[20px] !w-[20px] text-black" />
                        )
                      }
                      onClick={() => {}}
                      dataCY={`mode-${mode.routeName}-${studyInstanceUid}`}
                      className={isValidMode ? 'text-[13px]' : 'bg-[#222d44] text-[13px]'}
                    >
                      Open
                    </Button>
                  </Link>
                )
              );
            })}
          </div>
        </StudyListExpandedRow>
      ),
      onClickRow: () =>
        setExpandedRows(s => (isExpanded ? s.filter(n => rowKey !== n) : [...s, rowKey])),
      isExpanded,
    };
  });

  const hasStudies = numOfStudies > 0;

  const AboutModal = customizationService.getCustomization('ohif.aboutModal');
  const UserPreferencesModal = customizationService.getCustomization('ohif.userPreferencesModal');

  const menuOptions = [
    {
      title: 'Profile',
      icon: 'info',
      onClick: () => {
        window.location.href = '/profile';
      },
    },
    {
      title: t('Header:About'),
      icon: 'info',
      onClick: () =>
        show({
          content: AboutModal as React.ComponentType,
          title: t('AboutModal:About TherAInostics Viewer'),
          containerClassName: 'max-w-md ',
        }),
    },
    {
      title: t('Header:Preferences'),
      icon: 'settings',
      onClick: () =>
        show({
          title: t('UserPreferencesModal:User preferences'),
          content: UserPreferencesModal as React.ComponentType,
          containerClassName: 'flex  max-w-4xl flex-col',
        }),
    },
    {
      title: 'Logout',
      onClick: () => {
        window.location.href = '/home';
      },
    },
  ];

  if (appConfig.oidc) {
    menuOptions.push({
      icon: 'power-off',
      title: t('Header:Logout'),
      onClick: () => {
        navigate(`/logout?redirect_uri=${encodeURIComponent(window.location.href)}`);
      },
    });
  }

  const LoadingIndicatorProgress = customizationService.getCustomization(
    'ui.loadingIndicatorProgress'
  );
  const DicomUploadComponent = customizationService.getCustomization('dicomUploadComponent');

  const uploadProps =
    DicomUploadComponent && dataSource.getConfig()?.dicomUploadEnabled
      ? {
          title: 'Upload files',
          closeButton: true,
          shouldCloseOnEsc: false,
          shouldCloseOnOverlayClick: false,
          content: () => (
            <DicomUploadComponent
              dataSource={dataSource}
              onComplete={() => {
                hide();
                onRefresh();
              }}
              onStarted={() => {
                show({
                  ...uploadProps,
                  closeButton: false,
                });
              }}
            />
          ),
        }
      : undefined;

  const dataSourceConfigurationComponent = customizationService.getCustomization(
    'ohif.dataSourceConfigurationComponent'
  );

  // Debug logging (existing)
  console.log('Total studies from props:', studies?.length);
  console.log('Filtered studies count:', filteredStudies.length);
  console.log('Current filter values:', filterValues);

  return (
    <div className="flex h-screen flex-col bg-black">
      <Header
        isSticky
        menuOptions={menuOptions}
        isReturnEnabled={false}
        WhiteLabeling={appConfig.whiteLabeling}
        showPatientInfo={PatientInfoVisibility.VISIBLE}
      />
      {/* <Onboarding /> */}
      {/* <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} /> */}
      <div className="flex h-full flex-col overflow-y-auto">
        <ScrollArea>
          <div className="flex grow flex-col">
            <StudyListFilter
              numOfStudies={pageNumber * resultsPerPage > 100 ? 101 : numOfStudies}
              filtersMeta={filtersMeta}
              filterValues={{ ...filterValues, ...defaultSortValues }}
              onChange={setFilterValues}
              clearFilters={() => setFilterValues(defaultFilterValues)}
              isFiltering={isFiltering(filterValues, defaultFilterValues)}
              onUploadClick={uploadProps ? () => show(uploadProps) : undefined}
              getDataSourceConfigurationComponent={
                dataSourceConfigurationComponent
                  ? () => dataSourceConfigurationComponent()
                  : undefined
              }
            />
          </div>
          {hasStudies ? (
            <div className="flex grow flex-col">
              <StudyListTable
                tableDataSource={tableDataSource.slice(offset, offsetAndTake)}
                numOfStudies={numOfStudies}
                querying={querying}
                filtersMeta={filtersMeta}
              />
              <div className="grow">
                <StudyListPagination
                  onChangePage={onPageNumberChange}
                  onChangePerPage={onResultsPerPageChange}
                  currentPage={pageNumber}
                  perPage={resultsPerPage}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-48">
              {appConfig.showLoadingIndicator && isLoadingData ? (
                <LoadingIndicatorProgress className={'h-full w-full bg-black'} />
              ) : (
                <EmptyStudies />
              )}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

WorkList.propTypes = {
  data: PropTypes.array.isRequired,
  dataSource: PropTypes.shape({
    query: PropTypes.object.isRequired,
    getConfig: PropTypes.func,
  }).isRequired,
  isLoadingData: PropTypes.bool.isRequired,
  servicesManager: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func, // New prop for handling filter changes
};

const defaultFilterValues = {
  patientName: '',
  mrn: '',
  studyDate: {
    startDate: null,
    endDate: null,
  },
  description: '',
  diagnosis: '', // New field for diagnosis filtering
  modalities: [],
  accession: '',
  sortBy: '',
  sortDirection: 'none',
  pageNumber: 1,
  resultsPerPage: 25,
  datasources: '',
};

function _tryParseInt(str, defaultValue) {
  let retValue = defaultValue;
  if (str && str.length > 0) {
    if (!isNaN(str)) {
      retValue = parseInt(str);
    }
  }
  return retValue;
}

function _getQueryFilterValues(params) {
  const newParams = new URLSearchParams();
  for (const [key, value] of params) {
    newParams.set(key.toLowerCase(), value);
  }
  params = newParams;

  const queryFilterValues = {
    patientName: params.get('patientname'),
    mrn: params.get('mrn'),
    studyDate: {
      startDate: params.get('startdate') || null,
      endDate: params.get('enddate') || null,
    },
    description: params.get('description'),
    diagnosis: params.get('diagnosis'), // New field
    modalities: params.get('modalities') ? params.get('modalities').split(',') : [],
    accession: params.get('accession'),
    sortBy: params.get('sortby'),
    sortDirection: params.get('sortdirection'),
    pageNumber: _tryParseInt(params.get('pagenumber'), undefined),
    resultsPerPage: _tryParseInt(params.get('resultsperpage'), undefined),
    datasources: params.get('datasources'),
    configUrl: params.get('configurl'),
  };

  // Delete null/undefined keys
  Object.keys(queryFilterValues).forEach(
    key => queryFilterValues[key] == null && delete queryFilterValues[key]
  );

  // Debug: Log parsed query filter values
  console.log('Parsed queryFilterValues from URL:', queryFilterValues);
  return queryFilterValues;
}

function _sortStringDates(s1, s2, sortModifier) {
  // TODO: Delimiters are non-standard. Should we support them?
  const s1Date = moment(s1.date, ['YYYYMMDD', 'YYYY.MM.DD'], true);
  const s2Date = moment(s2.date, ['YYYYMMDD', 'YYYY.MM.DD'], true);

  if (s1Date.isValid() && s2Date.isValid()) {
    return (s1Date.toISOString() > s2Date.toISOString() ? 1 : -1) * sortModifier;
  } else if (s1Date.isValid()) {
    return sortModifier;
  } else if (s2Date.isValid()) {
    return -1 * sortModifier;
  }
}

export default WorkList;
