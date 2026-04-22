

export const Apps = [
  {
    key: 'ripple',
    name: '水波纹',
    component: () => import('../area/ripple.tsx')
  },
  {
    key: 'navigationBar',
    name: '导航栏',
    component: () => import('../area/navigationBar.tsx')
  },
  {
    key: 'Badge',
    name: '徽章',
    component: () => import('../area/badge.tsx')
  },
  {
    key: 'buttons',
    name: '按钮',
    component: () => import('../area/button.tsx')
  },
  {
    key: 'buttonsGroup',
    name: '按钮组',
    component: () => import('../area/buttonGroup.tsx')
  },
  {
    key: 'indicators',
    name: '指示器',
    component: () => import('../area/indicators.tsx')
  },
  {
    key: 'textField',
    name: '文本框',
    component: () => import('../area/textFields.tsx')
  },
  {
    key: 'switch',
    name: '开关',
    component: () => import('../area/switch.tsx')
  },
  {
    key: 'checkbox',
    name: '复选框',
    component: () => import('../area/checkbox.tsx')
  },
  {
    key: 'card',
    name: '卡片',
    component: () => import('../area/card.tsx')
  },
  {
    key: 'slider',
    name: '滑动条',
    component: () => import('../area/slider.tsx')
  },
  {
    key: 'divider',
    name: '分割线',
    component: () => import('../area/divider.tsx')
  },
  {
    key: 'tooltips',
    name: '提示',
    component: () => import('../area/tooltips.tsx')
  },

]