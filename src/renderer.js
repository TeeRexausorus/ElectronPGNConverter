const fs = window.electronFS;
const fileWriter = window.writer;
const {en, fr} = window.translation;
document.body.addEventListener("dragover", evt => {
    evt.preventDefault();
});

document.getElementById('drag1').ondragstart = (event) => {
    event.preventDefault();
    window.electron.startDrag(this.outputfilename);
};

document.getElementById('dropZone').ondrop = (event) => {
    event.preventDefault();

    let file = event.dataTransfer.files[0];
    let filePath = file.path;
    let filename = '';
    if (filePath.includes('/')){
        filename = filePath.split("/").slice(-1)[0];
    } else {
        filename = filePath.split("\\").slice(-1)[0];
    }
    this.outputfilename = filename.replace('.PGN', '_output.PGN');
    let output = '';
    fs.readFile(filePath, {encoding: 'latin1'}, (err, data) => {
        let ignore = true;
        for (let char of data) {
            if (char === '[' || char === '{') {
                ignore = true;
            }
            if (char === ']' || char === '}') {
                ignore = false;
            }

            let from = fr;
            let to = en;

            output += ignore ? char : char
                .replaceAll(from.KING, to.KING)
                .replaceAll(from.QUEEN,to.QUEEN)
                .replaceAll(from.ROOK,to.ROOK)
                .replaceAll(from.BISHOP,to.BISHOP)
                .replaceAll(from.KNIGHT,to.KNIGHT)
        }
        console.log(filename, output);
        if (err) {
            console.error(err);
        }
        fileWriter.writeOutputFile(this.outputfilename, output);
        document.getElementById('drag1').style.display = "block";
    })
};
