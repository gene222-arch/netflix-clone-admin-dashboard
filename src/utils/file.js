
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