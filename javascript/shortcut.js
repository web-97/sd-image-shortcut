document.addEventListener('DOMContentLoaded', function() {
    onUiLoaded(initUi);
});
const renderBut = ()=>{
    const buts = localStorage.getItem('user_save_size')?.split(',')??[]
    const [shortcutButsTxt,shortcutButsImg] = document.getElementsByClassName('shortcut-buts')
    const shortcutAuto = document.getElementsByClassName('shortcut-auto')[0]
    const txt2img_width = document.getElementById('txt2img_width')
    const txt2img_height = document.getElementById('txt2img_height')
    const img2img_width = document.getElementById('img2img_width')
    const img2img_height = document.getElementById('img2img_height')
    for (let child of shortcutButsTxt?.children) {
        if (child.innerHTML!=='Auto'){
            setTimeout(()=>shortcutButsTxt.removeChild(child))
        }
    }
    for (let child of shortcutButsImg?.children) {
        if (child.innerHTML!=='Auto'){
            setTimeout(()=>shortcutButsImg.removeChild(child))
        }
    }
    buts?.forEach(but=>{
        if (but){
            const [width,height] = but.split('*')
            //1
            const cur = shortcutAuto.cloneNode(true)
            cur.innerHTML = but
            cur.onclick = ()=>{
                for (const input of txt2img_width.getElementsByTagName("input")) {
                    input.value = width;
                }
                for (const input of txt2img_height.getElementsByTagName("input")) {
                    input.value = height;
                }
            }
            cur.style.display = 'inline-flex'
            shortcutButsTxt.prepend(cur)
            //2
            const cur1 = shortcutAuto.cloneNode(true)
            cur1.innerHTML = but
            cur1.onclick = ()=>{
                for (const input of img2img_width.getElementsByTagName("input")) {
                    input.value = width;
                }
                for (const input of img2img_height.getElementsByTagName("input")) {
                    input.value = height;
                }
            }
            cur1.style.display = 'inline-flex'
            shortcutButsImg.prepend(cur1)
        }
    })
}
const saveSize = (width,height)=>{
    const storage = localStorage.getItem('user_save_size')
    if (!storage||!storage.includes(`${width}*${height}`)){
        localStorage.setItem('user_save_size',(storage?storage:'')+`${width}*${height},`)
    }else {
        localStorage.setItem('user_save_size',storage.replaceAll(`${width}*${height},`,''))
    }
    renderBut()
}
const initUi = () => {
    //1
    const imageSizeBox = document.getElementById('txt2img_dimensions_row')
    const saveSizeBox = imageSizeBox.children[0].cloneNode(true)
    saveSizeBox.setAttribute('id','txt2img_res_save_btn')
    const saveSizeButton = saveSizeBox.children[0]
    saveSizeButton.innerHTML = '⚑'
    const txt2img_width = document.getElementById('txt2img_width')
    const txt2img_height = document.getElementById('txt2img_height')

    saveSizeButton.onclick = ()=>{
        const width = txt2img_width.getElementsByTagName("input")[0].value
        const height = txt2img_height.getElementsByTagName("input")[0].value
        saveSize(width,height)
    }
    imageSizeBox.append(saveSizeBox)

    //2
    const imageSizeBox2 = document.getElementById('img2img_dimensions_row')
    const saveSizeBox2 = saveSizeBox.cloneNode(true)
    saveSizeBox2.setAttribute('id','img2img_res_save_btn')
    const saveSizeButton2 = saveSizeBox2.children[0]
    const img2img_width = document.getElementById('img2img_width')
    const img2img_height = document.getElementById('img2img_height')
    saveSizeButton2.onclick = ()=>{
        const width = img2img_width.getElementsByTagName("input")[0].value
        const height = img2img_height.getElementsByTagName("input")[0].value
        saveSize(width,height)
    }
    imageSizeBox2.append(saveSizeBox2)
    renderBut()
    for (let elementsByClassNameElement of document.getElementsByClassName('shortcut-active')) {
        elementsByClassNameElement.getElementsByClassName('svelte-s1r2yt')[0].onclick = renderBut
    }
}
const calculateImageSize = (sourceWidth, sourceHeight, targetPixels) =>{
    const sourcePixels = sourceWidth * sourceHeight;
    const scaleFactor = Math.sqrt(targetPixels / sourcePixels);
    const targetWidth = Math.round(sourceWidth * scaleFactor);
    const targetHeight = Math.round(sourceHeight * scaleFactor);
    return { width: targetWidth, height: targetHeight };
}

const autoReadImageSize = ()=>{
    for (let child of document.getElementById('mode_img2img').children) {
        if (child.style.display==='block'){
            const imgs = child.getElementsByTagName('img')
            if (imgs?.length>0){
                const img2img_width = document.getElementById('img2img_width')
                const img2img_height = document.getElementById('img2img_height')
                const img = imgs[0]
                const imgWidth = img.naturalWidth
                const imgHeight = img.naturalHeight
                const res = calculateImageSize(imgWidth,imgHeight,(512*512))
                for (const input of img2img_width.getElementsByTagName("input")) {
                    input.value = res.width
                }
                for (const input of img2img_height.getElementsByTagName("input")) {
                    input.value = res.height
                }
            }
        }
    }
}