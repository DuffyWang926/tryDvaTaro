export const confirmData = (model, data) =>{

    Array.isArray(model) && model.map((v,i) =>{
        if(!v.children){
            let value = data[v.name]
            console.log(Object.prototype.toString.call(value).slice(8,-1), v.type)
            if(value === undefined){
                console.error( `${v.name} of response is wrong`)
            }else if(Object.prototype.toString.call(value).slice(8,-1) !== v.type){
                console.error( `${v.name} of response is wrong`)
            }
        }else{
            return confirmData(v.children, data[v.name])
        }
    })


}

export const cloneDeep = (data) =>{
    return data
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

  function * throttle(func, time) {
    let timerID = null;
    function throttled(arg) {
      clearTimeout(timerID);
      timerID = setTimeout(func.bind(window, arg), time);
    }
    while (true)
      throttled(yield);
  }