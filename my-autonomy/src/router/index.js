import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import My from '@/components/My'
import DailyRecord from '@/components/DailyRecord'
import Overview from '@/components/Overview'
import Classify from '@/components/Classify'
import ChartView from '@/components/ChartView'
import ItemList from '@/components/my/ItemList'
import SubItemList from '@/components/my/SubItemList'
import DataList from '@/components/my/DataList'
import RealtimeRecord from '@/components/RealtimeRecord'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/overview',
          name: 'overview',
          component: Overview
        },
        {
          path: '/my',
          name: 'my',
          component: My,
          children: [
          ]
        },

        {
          path: '/dailyrecord',
          name: 'dailyrecord',
          component: DailyRecord
        }, {
          path: '/overview',
          name: 'overview',
          component: Overview
        }, {
          path: '/classify',
          name: 'classify',
          component: Classify,
          children: [
            {
              path: '/chart',
              name: 'chart',
              component: ChartView
            }
          ]
        }
        , {
          path: '/itemlist',
          name: 'itemlist',
          component: ItemList
        }, {
          path: '/subitemlist',
          name: 'subitemlist',
          component: SubItemList
        },
        {
          path: 'datalist',
          name: 'datalist',
          component: DataList
        },
        {
          path: '/records',
          name: 'records',
          component: RealtimeRecord
        },

      ]
    },


  ]
})
