/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import NavAdmin from '~/layouts/admin/NavbarAdmin'
import ModalCreateHome from './ModelCreateHome'
import './Admin.css'

const MainManagement = ({ setIsAdmin }) => {
  useEffect(() => {
    setIsAdmin(true)
  }, [])

  return (
    <div style={{ backgroundColor: ' #e4eef5' }}>
      <NavAdmin setIsAdmin={setIsAdmin} />
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', margin: '10px' }}>
        <div style={{ height: '100vh', padding: '15px' }}>
          <div style={{ borderRadius: '10px' }}>
            <div style={{ borderRadius: '10px', padding: '30px', textAlign: 'center' }}>
              <img width="200px" src="./empty-box-4085812-3385481.webp" />
              <h4>Bạn chưa có tòa nhà cho thuê nào! Vui lòng thêm nhà trọ trước khi tiếp tục.</h4>
              <p>Với thiết kết đơn giản - thân thiện - dễ sử dụng. Quản lý nhà trọ của bạn dễ hơn bao giờ hết.</p>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12" style={{ display: 'grid' }}>
                <div
                  style={{
                    display: 'grid',
                    backgroundImage: 'url(./building.png)',
                    backgroundPosition: '90%',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#cde9f1',
                    borderRadius: '15px',
                    padding: '30px',
                    margin: '40px',
                    marginTop: '0px',
                  }}>
                  <h3>Bắt đầu tạo nhà cho thuê của bạn</h3>
                  <p>Để nhập nhanh hơn hãy bắt đầu nhập tự tập tin excel</p>
                  <ul className="stepProgress">
                    <li className="stepProgress-item">Bước 1: Tải file mẫu</li>
                    <li className="stepProgress-item">Bước 2: Nhập dữ liễu của bạn vào file mẫu</li>
                    <li className="stepProgress-item">Bước 3: Upload file mẫu lên để nhập liệu</li>
                  </ul>
                  <div>
                    <button
                      className="btn btn-primary mt-3"
                      data-bs-toggle="modal"
                      data-bs-target="#addBlock"
                      data-mode="add">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-plus">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      Tạo nhà trọ đầu tiên
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal and block */}
      <ModalCreateHome />
    </div>
  )
}

export default MainManagement