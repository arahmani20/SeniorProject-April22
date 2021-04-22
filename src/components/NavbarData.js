import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const NavbarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    
    {
        title: 'Task Manager',
        path: '/taskmanager',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },

    {
        title: 'Project',
        path: '/project',
        icon: <IoIcons.IoIosFolderOpen />,
        cName: 'nav-text'
    },
    {
        title: 'File Hub',
        path: '/filehub',
        icon: <IoIcons.IoIosCloudDownload />,
        cName: 'nav-text'
    },

    {
        title: 'Generate Report',
        path: '/',
        icon: <IoIcons.IoIosListBox/>,
        cName: 'nav-text'
    },

    
]