import {Workbook} from 'observablehq:stdlib/xlsx'
import LoadFileButton from './LoadFileButton.js';

function LoadExcelButton({ text, onLoad, style }) {
    function handleOnFile(file) {
        const reader = new FileReader();
        reader.onload = e => Workbook.load(e.target.result).then(onLoad);
        reader.readAsArrayBuffer(file);
    }
    return <LoadFileButton text={text} onLoad={handleOnFile} style={style}/>;
}

export default LoadExcelButton;