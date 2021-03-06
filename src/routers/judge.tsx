import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Review from '../pages/review'
import Inbox from '../pages/inbox'
import NoMatch from '../pages/noMatch'
import Account from '../pages/account'
import ReviewDetail from '../pages/reviewDetail'

const judge: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Account /> },
      { path: 'account', element: <Account /> },
      { path: 'inbox', element: <Inbox /> },
      {
        path: 'review',
        element: <Review />,
        children: [
          {
            path: 'detail',
            element: <ReviewDetail />,
          },
        ],
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default judge
