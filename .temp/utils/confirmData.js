export const confirmData = (model, data) => {

  Array.isArray(model) && model.map((v, i) => {
    if (!v.children) {
      let value = data[v.name];
      console.log(Object.prototype.toString.call(value).slice(8, -1), v.type);
      if (value === undefined) {
        console.error(`${v.name} of response is wrong`);
      } else if (Object.prototype.toString.call(value).slice(8, -1) !== v.type) {
        console.error(`${v.name} of response is wrong`);
      }
    } else {
      return confirmData(v.children, data[v.name]);
    }
  });
};