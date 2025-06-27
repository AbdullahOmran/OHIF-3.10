import { mprPt } from './hps/mprPt';
import { mprCt } from './hps/mprCt';
import { mprFusion } from './hps/mprFusion';
import { mip } from './hps/mip';
import { comparison } from './hps/comparison';
import { hpPdfReport } from './hps/hpPdfReport'; // Import the new protocol

function getHangingProtocolModule() {
  return [
    {
      name: mprPt.id,
      protocol: mprPt,
    },
    {
      name: mprCt.id,
      protocol: mprCt,
    },
    {
      name: mprFusion.id,
      protocol: mprFusion,
    },
    {
      name: mip.id,
      protocol: mip,
    },
    {
      name: comparison.id,
      protocol: comparison,
    },
    {
      name: hpPdfReport.id,
      protocol: hpPdfReport,
    },
  ];
}

export default getHangingProtocolModule;
