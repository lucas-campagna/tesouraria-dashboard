import LoadExcelButton from './LoadExcelButton.js';
import {FileAttachment} from "observablehq:stdlib";

const yearFull = (new Date()).getFullYear();
const months = await FileAttachment("../data/months.json").json();

function LoadBalanceteButton({ text, onData, style }) {

    function handleOnWorkbook(workbook) {
        let data = [];
        for (const sheet of workbook.sheetNames) {
            const [monthName, yearShort] = sheet.split('-');
            const year = 2000 + parseInt(yearShort) < yearFull ? 2000 + parseInt(yearShort) : 1900 + parseInt(yearShort);
            const month = months.indexOf(monthName);
            const date = new Date(`${year}-${month+1}-1`).getTime()
            data = [...data, ...processBalancete(workbook.sheet(sheet)).map(p => ({ date, ...p }))];
        }
        onData(data)
    }
    return <LoadExcelButton text={text} onLoad={handleOnWorkbook} style={style} />;
}

export default LoadBalanceteButton;

const processBalancete = sheet => sheet.reduce((acc, { A: conta, B: nome, G: orcamento, H: valor, I: total }) => {
    if (conta?.toString()?.endsWith('00')) {
        acc.categoria = nome;
    }
    if (nome !== undefined && typeof conta === 'number' && conta > acc.current && !(orcamento === undefined && valor === undefined && total === undefined)) {
        acc.current = conta,
            acc.data = [...acc.data, { conta, nome, categoria: acc.categoria, orcamento, valor, total }]
    }
    return acc;
}, { current: 0, categoria: undefined, data: [], }).data