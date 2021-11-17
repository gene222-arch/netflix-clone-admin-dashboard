
export const getFilePreview = (event) => 
{
    let files = event.target.files || event.dataTransfer.files;
    
    if (!files.length) return;
    
    const file = files[0];
    const fileSizeInMb = (file.size / 1000);
    const reader = new FileReader();
    let filePreview = null;
    
    reader.onload = (event) => {
        filePreview = event.target.result;
    }

    reader.readAsDataURL(file);

    return { file, filePreview, fileSizeInMb };
}

export const base64ToFile = (dataurl, filename) => 
{
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while( n-- ) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}