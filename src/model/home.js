/**
 * 接口响应，最外层统一格式
 */
export  const HomeDataModel =[
    {
      name:'activitys',
      type:'Array',
      
    },
    {
      name:'carouses',
      type:'Array',
      ArrayModel:[
        {
          name:'img',
          type:'String'
        }
      ]
    },
    {
      name:'floors',
      type:'Array'
    }
  ]

  export  const HomeLiveModel =[
    {
      name:'data',
      type:'Array',
      ArrayModel:[
        {
          name:'roomName',
          type:'String'
        },
        {
          name:'picUrl',
          type:'String'
        },
      ]
    }
    
  ]

  HomeLiveModel

