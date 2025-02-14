import { useRef } from 'npm:react';

function LoadFileButton({ text, onLoad, style }) {
    const refFile = useRef(null);
    function handleClick() {
        if(refFile.current){
            refFile.current.click();
            refFile.current.value = null
        }
    }
    return (
        <>
            <input
                ref={refFile}
                style={{ display: 'none' }}
                type='file'
                multiple={true}
                onChange={e => {
                    for (const file of e.target.files) {
                        onLoad(file)
                    }
                }}
            />
            <button
                style={style}
                onClick={handleClick}
            >
                {text}
            </button>
        </>
    )
}

export default LoadFileButton;