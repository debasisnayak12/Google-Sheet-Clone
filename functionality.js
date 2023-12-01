let activeCellId = null;

const activeCellElement = document.getElementById('active-cell');
const form = document.querySelector('.form');
const state = {};

form.addEventListener('change',onChangeFormData);

const defaultStyles = {
    fontFamily: "poppins-regular",
    fontSize: 16,
    isBold: false,
    isItalic: false,
    isUnderline: false,
    align: "left",
    textColor: "#000000",
    bgColor: "#ffffff",
}

function onChangeCellText(event){
    let changedText = event.target.innerText;
    if(state[activeCellId]){
        state[activeCellId].text = changedText;
    }else{
        state[activeCellId] = { ...defaultStyles, text:changedText };
    }
}


// extract all form value 
function onChangeFormData(){
    const options = {
        fontFamily: form["fontFamily"].value,
        fontSize: form["fontSize"].value,
        isBold: form["isBold"].checked,
        isItalic: form["isItalic"].checked,
        isUnderline: form.isUnderline.checked,
        align: form.align.value,
        textColor: form.textColor.value,
        bgColor: form.bgColor.value
    };
//    console.log(options);
    applyStyles(options);
}

function applyStyles(styles){
   //    It will apply the style to the active cell  
      if(!activeCellId){
        form.reset();
        alert("Please select a cell to apply");
        return;
      }
    //   if cell is selected then apply to it 
    const activeCell = document.getElementById(activeCellId);
    activeCell.style.color = styles.textColor;
    activeCell.style.fontFamily = styles.fontFamily;
    activeCell.style.fontSize = styles.fontSize + "px";
    activeCell.style.fontWeight = styles.isBold ? "600" : "400";
    activeCell.style.fontStyle = styles.isItalic ? "italic" : "normal";
    activeCell.style.textDecoration = styles.isUnderline ? "underline" : "none";
    activeCell.style.textAlign = styles.align;
    activeCell.style.backgroundColor = styles.bgColor;

    // whenever there's an update on a cell style, update those style with the object state
    state[activeCellId] = { ...styles , text: activeCell.innerText };
}


function onFocusCellId(event){
    if(activeCellId === event.target.id) return;

    activeCellId = event.target.id;
    activeCellElement.innerText = activeCellId;

    // reset the form with its actual styles 
    if(state[activeCellId]){
        // already touched cell 
        resetForm(state[activeCellId]);
    }else{
        resetForm(defaultStyles);
    }

}

function resetForm(styles){
    // console.log(styles);
    form.fontSize.value = styles.fontSize;
    form.fontFamily.value = styles.fontFamily;
    form.isBold.checked = styles.isBold;
    form.isItalic.checked = styles.isItalic;
    form.isUnderline.checked = styles.isUnderline;
    form.align.value = styles.align;
    form.textColor.value = styles.textColor;
    form.bgColor.value = styles.bgColor;
}


function exportData(){
    const jsonData = JSON.stringify(state);
    const blob = new Blob([jsonData], {type:"text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "data.json";
    link.href = url;
    link.click();
}