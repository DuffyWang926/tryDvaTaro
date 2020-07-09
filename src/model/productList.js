/**
 * 接口响应，最外层统一格式
 */
export  const PorductListModel =[
    {
      name:'products',
      type:'Array',
      ArrayModel:[
        {
          name:'masterImg',
          type:'String'
        },
        {
          name:'name',
          type:'String'
        },
        {
          name:'minPoints',
          type:'Number'
        },
        {
          name:'minNowPrice',
          type:'String'
        },
        {
          name:'minOldPrice',
          type:'String'
        }
        
      ]
    }
  ]


