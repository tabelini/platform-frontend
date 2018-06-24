export const navigation = [
  {
    'id': 'applications',
    'title': 'IoT',
    'translate': 'NAV.APPLICATIONS',
    'type': 'group',
    'icon': 'apps',
    'children': [
      {
        'id': 'dashboards',
        'title': 'Painéis',
        'translate': 'NAV.DASHBOARDS',
        'type': 'collapse',
        'icon': 'dashboard',
        'children': [
          {
            'id': 'analytics',
            'title': 'Analítico',
            'type': 'item',
            'url': '/apps/dashboards/analytics'
          }
        ]
      },
      {
        'id': 'cadastros',
        'title': 'Cadastros',
        'translate': 'Cadastros',
        'type': 'collapse',
        'icon': 'assignment',
        'children': [
          {
            'id': 'endPoints',
            'title': 'EndPoints',
            'type': 'item',
            'url': '/endpoints'
          },
          {
            'id': 'sensors',
            'title': 'Sensores',
            'type': 'item',
            'url': '/sensors'
          },
          {
            'id': 'actuators',
            'title': 'Atuadores',
            'type': 'item',
            'url': '/actuators'
          },
          {
            'id': 'triggers',
            'title': 'Gatilhos',
            'type': 'item',
            'url': '/triggers'
          }
        ]
      },
      {
        'id': 'access',
        'title': 'Acessos',
        'translate': 'Acessos',
        'type': 'collapse',
        'icon': 'account_box',
        'children': [
          {
            'id': 'users',
            'title': 'Usuários',
            'type': 'item',
            'url': '/users'
          },
          {
            'id': 'customers',
            'title': 'Clientes',
            'type': 'item',
            'url': '/customers'
          },
        ]
      }
    ]
  }
];
