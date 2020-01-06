import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import HomeIcon from '@material-ui/icons/Home';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import GroupIcon from '@material-ui/icons/Group';

const JsonMenuConfigs = () => {
  return [
    {
      key: 'home',
      label: 'Home',
      icon: <HomeIcon style={{ fontSize: '2rem', color: '#0091EA' }} />,
      to: '/',
      items: []
    },
    {
      key: 'youtube',
      label: 'Youtube',
      icon: <YouTubeIcon style={{ fontSize: '2rem', color: '#F44336' }} />,
      to: '/youtube',
      items: [
        /* {
          key: 'subscribed',
          label: 'Subscribed',
          icon: (
            <SubscriptionsIcon style={{ fontSize: '2rem', color: '#ef5350' }} />
          ),
          to: '/subscribe',
          items: []
        } */
      ]
    },
    {
      key: 'facebook',
      label: 'Facebook',
      icon: <FacebookIcon style={{ fontSize: '2rem', color: '#01579B' }} />,
      to: '/facebook',
      items: [
       /*  {
          key: 'group',
          label: 'Fanpage',
          icon: <GroupIcon style={{ fontSize: '2rem', color: '#0288d1' }} />,
          to: '/group',
          items: []
        } */
      ]
    },
    {
      key: 'about',
      label: 'About Us',
      icon: <MailIcon style={{ fontSize: '2rem', color: '#ffa726' }} />,
      to: '/about',
      items: []
    }
  ];
};

export const MenuConfigs = JsonMenuConfigs();
