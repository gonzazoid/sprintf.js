type Mode = 'sloppy' | 'neat' | 'strict';

export const sprintf = function(pattern: string, entries: {[key:string]:string}, mode?: Mode){
    const replacer = function(match: string, key: string): string{
        let res: string;
        switch(true){
            case !mode || mode === 'sloppy':
                res = entries[key];
                break;
            case mode === 'neat':
                res = entries.hasOwnProperty(key) ? entries[key] : match;
                break;
            case mode === 'strict':
                if(entries.hasOwnProperty(key)){
                    res = entries[key];
                }else{
                    throw new Error(`gonzazoid.sprintf.js: missed ${key} entry in passed replacements`);
                }
        }
        return res;
    };
    return pattern.replace(/(?:\/\%(.+?)\%\/)/g, replacer);
};
