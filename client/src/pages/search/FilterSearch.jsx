/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Box, Typography, Select, MenuItem, Slider } from '@mui/material'
import { useDebounce } from '@uidotdev/usehooks'

import ModalSearch from './ModalSearch'
import MicIcon from '@mui/icons-material/Mic'
import './SearchWHome.css'

import AudioRecorderModal from '../AI/Audio'
import { searchByName } from '~/apis/searchAPI'
import { useTranslation } from 'react-i18next'
import ListSearch from './ListSearch'

function FilterSearch({ setSearchData, searchKeyWord, setKeyword, keyword, setTotalRooms }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [openAudio, setOpenAudio] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleOpenAudio = () => setOpenAudio(true)
  const handleCloseAudio = () => setOpenAudio(false)
  const [range, setRange] = useState([0, 50])
  const [selectedValue, setSelectedValue] = useState('Dưới 50 triệu')
  const [area, setArea] = useState([0, 50])
  // const [keyfilter, setkeyfilter] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [cityValue, setcityValue] = useState('Hồ Chí Minh')
  const [districValue, setDistrictValue] = useState('Quận 1')
  const [selectedValueArea, setSelectedValueArea] = useState('Dưới 50 m2')
  const [isFirstSelection, setIsFirstSelection] = useState(true)

  const debouncedKeyword = useDebounce(keyword, 300)
  // const handleInputChange = (event) => {
  //   setSearchValue(event.target.value)
  // }

  const filterSearchfunc = (tinhThanh, quanHuyen) => {
    if (tinhThanh && !quanHuyen) {
      // Chỉ có tỉnh thành được chọn
      setcityValue(tinhThanh)
      setDistrictValue('') // Đặt quận huyện rỗng
      setKeyword(tinhThanh) // Sử dụng tỉnh thành
      setIsFirstSelection(false)
    } else if (!tinhThanh && quanHuyen) {
      // Chỉ có quận huyện được chọn
      setDistrictValue(quanHuyen)
      setKeyword(quanHuyen) // Sử dụng quận huyện
      setIsFirstSelection(false)
    } else if (tinhThanh && quanHuyen) {
      if (isFirstSelection) {
        // Lần đầu tiên chọn cả 2, giữ nguyên cả hai
        setcityValue(tinhThanh)
        setDistrictValue(quanHuyen)
        setKeyword(quanHuyen) // Ưu tiên quận huyện
        setIsFirstSelection(false)
      } else if (tinhThanh !== cityValue) {
        // Nếu tỉnh thành thay đổi
        setcityValue(tinhThanh)
        setDistrictValue('') // Đặt quận huyện rỗng
        setKeyword(tinhThanh) // Sử dụng tỉnh thành
      } else {
        // Nếu tỉnh thành không thay đổi
        setcityValue(tinhThanh)
        setDistrictValue(quanHuyen)
        setKeyword(quanHuyen) // Ưu tiên quận huyện
      }
    }
  }

  useEffect(() => {
    if (!searchKeyWord) {
      if (debouncedKeyword) {
        searchByName(debouncedKeyword)
          .then((searchResult) => {
            setSearchData(searchResult.data.result)
            setTotalRooms(searchResult.data.result.length)
          })
          .catch(() => {
            setSearchData([])
            setTotalRooms(0)
          })
      } else {
        searchByName(debouncedKeyword).then((searchResult) => {
          setSearchData(searchResult.data.result)
        })
      }
    }
  }, [debouncedKeyword, setSearchData, searchKeyWord])

  const handleSearch = (e) => {
    setKeyword(e.target.value)
  }

  const handleAreaChange = (event) => {
    const selectedValueArea = event.target.value

    switch (selectedValueArea) {
      case '1-5':
        setArea([1, 5])
        break
      case '5-10':
        setArea([5, 10])
        break
      case '10-15':
        setArea([10, 15])
        break
      case '0-50':
        setArea([0, 50])
        break
      default:
        setArea([0, 50])
    }
    setSelectedValueArea(event.target.value)
  }
  const handleSliderChangeArea = (event, newValue) => {
    setArea(newValue)

    const [min, max] = newValue
    if (min === 0 && max === 50) {
      setSelectedValueArea('Dưới 50 m2')
    } else if (min === 1 && max === 5) {
      setSelectedValueArea('1-5')
    } else if (min === 5 && max === 10) {
      setSelectedValueArea('5-10')
    } else if (min === 10 && max === 15) {
      setSelectedValueArea('10-15')
    } else {
      setSelectedValueArea(`Giá từ ${min} m2 đến ${max} m2`)
    }
  }

  const handleGiaChange = (event) => {
    const selectedValue = event.target.value

    switch (selectedValue) {
      case '1-5':
        setRange([1, 5])
        break
      case '5-10':
        setRange([5, 10])
        break
      case '10-15':
        setRange([10, 15])
        break
      case '0-50':
        setRange([0, 50])
        break
      default:
        setRange([0, 50])
    }
    setSelectedValue(event.target.value)
  }
  const handleSliderChange = (event, newValue) => {
    setRange(newValue)

    const [min, max] = newValue
    if (min === 0 && max === 50) {
      setSelectedValue('Dưới 50 triệu')
    } else if (min === 1 && max === 5) {
      setSelectedValue('1-5')
    } else if (min === 5 && max === 10) {
      setSelectedValue('5-10')
    } else if (min === 10 && max === 15) {
      setSelectedValue('10-15')
    } else {
      setSelectedValue(`Giá từ ${min} triệu đến ${max} triệu`)
    }
  }
  // const valuetext = (value) => {
  //   return `${value}°C`
  // }

  return (
    <section id="search-home">
      <div className="row check-availabilty" id="next">
        <div className="block-32 aos-init aos-animate" data-aos="fade-up" data-aos-offset="-200">
          <form action="#">
            <div className="row" style={{ backgroundColor: '#ffffff1f' }}>
              <div className="col-md-2 mb-3 mb-lg-0 col-lg-1 mt-2 d-none d-md-block">
                <ul id="search-bar" className="BoLoc">
                  <li
                    className="small"
                    data-toggle="modal"
                    data-target="#get-filter-data-user"
                    onClick={handleOpen}
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      marginRight: '7px'
                    }}>
                    <div
                      style={{
                        minWidth: '75px',
                        height: '100%',
                        backgroundColor: '#fff',
                        borderRadius: '5px',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="css-i6dzq1">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                      </svg>
                      <span style={{ fontSize: '13px' }}>{t('bo-loc')}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-10 mb-3 mb-lg-0 col-lg-2 mt-2">
                <ul id="search-bar">
                  <li
                    className="location-home"
                    data-toggle="modal"
                    data-target="#get-filter-data-user"
                    onClick={handleOpen}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: '5px' }}>
                        <svg
                          viewBox="0 0 24 24"
                          width="17"
                          height="17"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="css-i6dzq1">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div>
                        <b className="province-location-show">{cityValue}</b>
                        <br />
                        <span className="district-location-show">{districValue}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#666'
                      }}>
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="css-i6dzq1">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-12 mb-3 mb-lg-0 col-lg-5 mt-2">
                <ul id="search-bar">
                  <li className="keyword" style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="form-control w-100"
                      placeholder={t('noi-hoc-tap')}
                      autoComplete="off"
                      value={keyword} // Hiển thị dữ liệu ghi âm
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <MicIcon
                      onClick={handleOpenAudio}
                      style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        marginRight: '10px',
                        fontSize: '28px',
                        color: '#555',
                        top: '9',
                        right: '0'
                      }}
                    />
                    <div className="guid-search id-1727803392186 dropdown" style={{ display: 'none' }}>
                      Suggest search...
                    </div>
                  </li>
                </ul>
              </div>

              <div className="col-md-12 mb-3 mb-md-0 col-lg-3">
                <div className="row">
                  <div className="col-md-6 mb-3 mb-md-0 mt-2">
                    <Select
                      style={{
                        marginBottom: '10px',
                        height: '45px',
                        display: 'block',
                        width: '100%',
                        fontSize: '1rem',
                        fontWeight: '400',
                        lineHeight: '1.5',
                        color: 'var(--bs-body-color)',
                        backgroundColor: 'var(--bs-body-bg)',
                        backgroundClip: 'padding-box',
                        border: 'var(--bs-border-width) solid var(--bs-border-color)',
                        appearance: 'none',
                        borderRadius: 'var(--bs-border-radius)',
                        transition: 'border-color .15s ease-in-out, box-shadow .15s ease-in-out'
                      }}
                      value={selectedValueArea} // Chuyển đổi state range sang dạng '1-5' để khớp với giá trị của MenuItem
                      onChange={handleAreaChange}
                      displayEmpty>
                      <Typography gutterBottom sx={{ mt: 2, mx: 1.5 }}>
                        {t('khoang-dien-tich')} ({t('dien-tich')})
                      </Typography>
                      <Box sx={{ mx: 1.5, my: 2 }}>
                        <Slider
                          value={area} // Sử dụng state range để thiết lập giá trị của Slider
                          onChange={handleSliderChangeArea}
                          max={50}
                          sx={{ width: '100%' }}
                          valueLabelDisplay="auto"
                        />
                      </Box>
                      <Typography sx={{ mx: 1.5 }}>{`Giá từ: ${area[0]} m2 đến ${area[1]} m2`}</Typography>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="1-5"> {t('tu')} 1 - 5 m2</MenuItem>
                      <MenuItem value="5-10"> {t('tu')} 5 - 10 m2</MenuItem>
                      <MenuItem value="10-15"> {t('tu')} 10 - 15 m2</MenuItem>
                      <MenuItem value="0-50">{t('duoi')} 50 m2</MenuItem>
                    </Select>
                  </div>
                  <div className="col-md-6 mb-3 mb-md-0 mt-2">
                    <Select
                      style={{
                        display: 'block',
                        height: '45px',
                        marginBottom: '10px',
                        width: '100%',
                        fontSize: '1rem',
                        fontWeight: '400',
                        lineHeight: '1.5',
                        color: 'var(--bs-body-color)',
                        backgroundColor: 'var(--bs-body-bg)',
                        backgroundClip: 'padding-box',
                        border: 'var(--bs-border-width) solid var(--bs-border-color)',
                        appearance: 'none',
                        borderRadius: 'var(--bs-border-radius)',
                        transition: 'border-color .15s ease-in-out, box-shadow .15s ease-in-out'
                      }}
                      value={selectedValue} // Chuyển đổi state range sang dạng '1-5' để khớp với giá trị của MenuItem
                      onChange={handleGiaChange}
                      displayEmpty>
                      <Typography gutterBottom sx={{ mt: 2, mx: 1.5 }}>
                        {t('khoang-gia')} ({t('trieu')})
                      </Typography>
                      <Box sx={{ mx: 1.5, my: 2 }}>
                        <Slider
                          value={range} // Sử dụng state range để thiết lập giá trị của Slider
                          onChange={handleSliderChange}
                          max={50}
                          sx={{ width: '100%' }}
                          valueLabelDisplay="auto"
                        />
                      </Box>
                      <Typography sx={{ mx: 1.5 }}>
                        {t('gia_tu')} :{` ${range[0]} triệu đến ${range[1]} triệu`}
                      </Typography>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="1-5">
                        {t('tu')} 1 - 5 {t('trieu')}
                      </MenuItem>
                      <MenuItem value="5-10">
                        {t('tu')} 5 {t('trieu')} - 10 {t('trieu')}
                      </MenuItem>
                      <MenuItem value="10-15">
                        {t('tu')} 10 {t('trieu')} - 15 {t('trieu')}
                      </MenuItem>
                      <MenuItem value="0-50">
                        {t('duoi')} 50 {t('trieu')}
                      </MenuItem>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-1 align-self-end mt-2  mb-3">
                <button
                  id="btn-s-h"
                  className="before-background"
                  aria-label="Tìm kiếm"
                  title="Tìm kiếm"
                  onClick={handleSearch}>
                  {t('tim-kiem')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ListSearch cityValue={cityValue} districValue={districValue} keyword={keyword} />

      <ModalSearch filterSearch={filterSearchfunc} open={open} handleClose={handleClose} />
      <AudioRecorderModal
        open={openAudio}
        setRecordedText={setKeyword}
        handleClose={handleCloseAudio}
        setIsRecording={setIsRecording}
        isRecording={isRecording}
        handleSearch={handleSearch}
      />
      <hr />
    </section>
  )
}

export default FilterSearch
