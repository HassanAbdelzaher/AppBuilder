var pa=require('../../package.json');
function getPackage():{version?:string,title?:string}{
    if(!pa)
        return {};
    return{
        version:pa.version||pa.Version||pa.VERSION,
        title:pa.title||pa.Title||pa.TITLE
    }
}
export default  getPackage();