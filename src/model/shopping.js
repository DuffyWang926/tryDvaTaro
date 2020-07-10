/**
 * 接口响应，最外层统一格式
 */
export  const ShoppingListModel =[
    {
      name:'levelACategoriesList',
      type:'Array',
      ArrayModel:[
        {
          name:'name',
          type:'String'
        },
        {
          name:'id',
          type:'Number'
        }
      ]
    },
    {
      name:'levelBCategoriesList',
      type:'Array',
      ArrayModel:[
        {
          name:'name',
          type:'String'
        },
        {
          name:'id',
          type:'Number'
        },
        {
          name:'productList',
          type:'Array'
        }
        
      ]
    }
  ]


