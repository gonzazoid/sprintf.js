export const sprintf = function(pattern: string, entries: {[key:string]:string}){
    return pattern.replace(/\/\%.+?\%\//g, (match: string): string => entries[match]);
};
