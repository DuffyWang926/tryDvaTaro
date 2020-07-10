export function confirmData (model, data){

    Array.isArray(model) && model.map((v,i) =>{
        if(!v.children){
            let value = data[v.name]
            let valueType = Object.prototype.toString.call(value).slice(8,-1)
            if(value === undefined){
                console.error( `${v} ${i} ${v.name}  of response is wrong`)
            }else if(valueType !== v.type){
                console.error( `${v} ${i} ${v.name}  of response is wrong`)
            }else if(valueType === 'Array'){
                if(v.ArrayModel){
                    value.map((val,key) =>{
                        confirmData(v.ArrayModel, val)
                    })
                }
            }
        }else{
            return confirmData(v.children, data[v.name])
        }
    })
}

export function cloneDeep (val) {
    let valueType = Object.prototype.toString.call(val).slice(8,-1)
    let root = {};
    if(valueType === 'Array'){
        root = []
    }
    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: val,
        }
    ];

    while(loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }
    

    return root;
    
}

export const countTime = (fn,cb,n) =>{
    let startTime = new Date().getTime();
    let count = 0;
    function fixed() {
        count++;
        let offset = new Date().getTime() - (startTime + count * n * 1000);
        let nextTime = 1000 - offset;
        if (nextTime < 0) nextTime = 0;
        let res = fn && fn()
        let timeTwo = setTimeout(fixed, nextTime);
        if(res <= 0){
          clearTimeout(t)
          clearTimeout(timeTwo)
          cb()
          return false
        }
    }
    let t = setTimeout(fixed, n * 1000);

  }

export function * throttle(func, time) {
    let timerID = null;
    function throttled(arg) {
      clearTimeout(timerID);
      timerID = setTimeout(func.bind(window, arg), time);
    }
    while (true)
      throttled(yield);
  }


export  function debounce(timeoutId, fn, context, ms = 500, arg) {
    
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        fn.apply(context, arg)
    }, ms)
    return timeoutId
  }
