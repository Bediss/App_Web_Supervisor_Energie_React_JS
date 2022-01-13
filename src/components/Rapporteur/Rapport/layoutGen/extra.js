export function getNested(obj, ...args) {
    return args.reduce((obj, level) => obj && obj[level], obj);
};

export function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
};

export const beautifyDate = (date, withTime = false) => {

    const splittedDate = date.toDateString().split(" ")
    const splittedTime = date.toTimeString().split(" ")[0].split(":")
    var bDate = `${splittedDate[2]} ${splittedDate[1]} ${splittedDate[3]}${withTime ? ` ${splittedTime[0]}:${splittedTime[1]}:${splittedTime[2]}` : ""}`;
    return { date, bDate }
};

export const parseParams = (params = "") => {
    const rawParams = params.replace("?", "").split("&");
    const extractedParams = {};
    rawParams.forEach((item) => {
        item = item.split("=");
        extractedParams[item[0]] = item[1];
    });
    return extractedParams;
};

export const prepareParams = (ml = [], cl = []) => {
    cl = cl.filter((val) => val)
    ml = ml.filter((val) => val)
    const clOutNames = cl.map((val) => val.Le_Compteur)
    const clOutCodes = cl.map((val) => val.Code_Compteur)
    const mlOutNames = ml.map((val) => val.m_name)
    const mlOutCodes = ml.map((val) => val.m_code)
    const out = {}
    if (ml && ml.length)
        Object.assign(out, { mlNames: { count: mlOutNames.length, data: mlOutNames.join(",") }, mlCodes: { count: mlOutCodes.length, data: mlOutCodes.join(",") } })
    if (cl && cl.length)
        Object.assign(out, { mlNames: { count: clOutNames.length, data: clOutNames.join(",") }, mlCodes: { count: clOutCodes.length, data: clOutCodes.join(",") } })
    return out
}

export const checkSize = (limit = 0, ml = [], cl = [], tl = "") => {
    const params=prepareParams(ml,cl)
    tl=tl.trim()
    if (params.mlNames.count != params.mlCodes.count) return false
    const mlNamesLength=params.mlNames.data.length
    const mlCodesLength=params.mlNames.data.length
    const clNamesLength=params.mlNames.data.length
    const clCodesLength=params.mlNames.data.length
    const parentLength="parent=12345678".length
    const reportIdLength="&reportId=12345678".length
    const counterLength="&counters=".length
    const labelsLength="&label=".length
    return parentLength+reportIdLength+mlNamesLength+counterLength+labelsLength+mlCodesLength+clNamesLength+clCodesLength<=limit

}
export const mergeDeep = (target, source, isMergingArrays = false) => {
    target = ((obj) => {
        let cloneObj;
        try {
            cloneObj = JSON.parse(JSON.stringify(obj));
        } catch(err) {
            // If the stringify fails due to circular reference, the merge defaults
            //   to a less-safe assignment that may still mutate elements in the target.
            // You can change this part to throw an error for a truly safe deep merge.
            cloneObj = Object.assign({}, obj);
        }
        return cloneObj;
    })(target);

    const isObject = (obj) => obj && typeof obj === "object";

    if (!isObject(target) || !isObject(source))
        return source;

    Object.keys(source).forEach(key => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (Array.isArray(targetValue) && Array.isArray(sourceValue))
            if (isMergingArrays) {
                target[key] = targetValue.map((x, i) => sourceValue.length <= i
                                                            ? x 
                                                            : mergeDeep(x, sourceValue[i], isMergingArrays));
                if (sourceValue.length > targetValue.length)
                    target[key] = target[key].concat(sourceValue.slice(targetValue.length));
            } else {
                target[key] = targetValue.concat(sourceValue);
            }
        else if (isObject(targetValue) && isObject(sourceValue))
            target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue, isMergingArrays);
        else
            target[key] = sourceValue;
    });

    return target;
};
export const getUniqueObjFromArray = (array) => {
    if (!Array.isArray(array)) return undefined
    array.filter((thing, index) => {
        const _thing = JSON.stringify(thing);
        return index === array.findIndex(obj => {
            return JSON.stringify(obj) === _thing;
        });
    });
};

export const removeUndefined = (obj) => {
    let newObj = Array.isArray(obj)?[]:{};
    Object.keys(obj).forEach((key) => {
      if (obj[key] === Object(obj[key])) newObj[key] = removeUndefined(obj[key]);
      else if (obj[key] !== undefined) newObj[key] = obj[key];
    });
    return newObj;
  };

//temp --> for specific case use 
export const isJson=(obj)=>(Array.isArray(obj)==false && typeof obj == "object")