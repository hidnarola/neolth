import { RouteInfo } from './admin-sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '/admin-panel/dashboard', title: 'Dashboard', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    // {
    //     path: '', title: 'Apps', icon: 'mdi mdi-apps', class: 'has-arrow', label: '', labelClass: '', extralink: false,
    //     submenu: [
    //         { path: '/apps/email', title: 'Mailbox', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    //         { path: '/apps/fullcalendar', title: 'Calendar', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    //         { path: '/apps/taskboard', title: 'Taskboard', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    //     ]
    // },
    // {
    //     path: '', title: 'UI Components', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    // },
    {
        path: '/admin-panel/hcp/view', title: 'HCP', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/admin-panel/patient/view', title: 'Patient', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/admin-panel/wellness-practices/view', title: 'Wellness-Practices', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/admin-panel/digital-assessment/view', title: 'Digital-Assessment', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/admin-panel/statistics', title: 'Statistics', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
];

