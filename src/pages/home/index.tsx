import { ExportOutlined, QuestionCircleOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import userStateStore from '../../store/userState'
import { useRecoilState } from 'recoil'
import menuMap from './components/menu'
import './index.scss'

const { Header, Content, Sider } = Layout

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [navigation, setNavigation] = useState('/')
  // const [collapsed, setCollapsed] = useState(false)
  const [userState, setUserState] = useRecoilState(userStateStore)
  const Menu = menuMap.get(userState)
  useEffect(() => {
    const match = location?.pathname
    const matchArray = match.split('/')
    match ? setNavigation('/' + matchArray[1]) : setNavigation('')
  }, [location])

  const handleClickMenuItem = (e: { key: string }) => {
    navigate(e.key)
    setNavigation(e.key)
  }
  const onFinish = (values: any) => {
    // console.log('Received values of form: ', values)
    switch (values.username) {
      case 'admin':
        setUserState('admin')
        localStorage.setItem('userState', 'admin')
        break
      case 'approver':
        setUserState('approver')
        localStorage.setItem('userState', 'admin')
        break
      case 'user':
        setUserState('user')
        localStorage.setItem('userState', 'user')
        break
      case 'judge':
        setUserState('judge')
        localStorage.setItem('userState', 'admin')
        break
      default:
        break
    }
  }

  const logout = () => {
    setUserState('offline')
    localStorage.setItem('userState', 'offline')
    setNavigation('/')
    navigate('/')
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="header-wrap">
          <div className="logo-wrap">
            <div className="logo"></div>
            <h1 className="logo-name">??????????????????????????????</h1>
          </div>
          <div className="control-wrap">
            <div className="control-item">
              <QuestionCircleOutlined></QuestionCircleOutlined>
            </div>
            <div className="control-item">
              <SearchOutlined></SearchOutlined>
            </div>
            <div className="control-item">
              <BellOutlined></BellOutlined>
            </div>

            <div className="user-wrap">
              <div className="user-img"></div>
              <div className="username">Teacher Gu</div>
            </div>
            <div className="control-item" onClick={logout}>
              <ExportOutlined
                style={{
                  fontSize: '24px',
                }}
              ></ExportOutlined>
            </div>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          // collapsible
          // collapsed={collapsed}
          // onCollapse={(value) => setCollapsed(value)}
          width={200}
          className="site-layout-background sidebar"
        >
          {userState === 'offline' ? <LoginForm finishCb={onFinish}></LoginForm> : <p>????????????</p>}
          <Menu handleClickMenuItem={handleClickMenuItem} navigation={navigation}></Menu>
        </Sider>
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              borderLeft: '1px solid rgba(0,0,0,0.1)',
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Home
