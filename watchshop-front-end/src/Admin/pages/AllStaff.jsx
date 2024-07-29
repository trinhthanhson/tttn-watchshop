import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStaffsRequest } from '../../redux/actions/actions'
import { getStatus } from '../../constants/Status'
import { MdModeEditOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const AllStaff = () => {
  const dispatch = useDispatch()
  const staffs = useSelector((state) => state.staffs.staffs)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      dispatch(getAllStaffsRequest())
    } catch (error) {
      console.error('Error dispatch', error)
    }
  }, [dispatch])
  return (
    <div className="flex flex-col gap-4 w-[80%] ml-[18%] rounded-md shadow-md bg-white mt-5">
      <table className="w-full text-gray-700">
        <thead className="text-white font-RobotoSemibold text-[18px] ">
          <tr className="bg-primary">
            <td className="rounded-s-md">ID</td>
            <td>Avatar</td>
            <td>Username</td>
            <td>Ngay Tao</td>
            <td className="rounded-e-md">Trạng Thái</td>
            <td className="rounded-e-md">Actions</td>
          </tr>
        </thead>
        <tbody>
          {staffs?.data &&
            staffs?.data
              .filter((staff) => staff.username !== 'admin')
              .map((staff) => (
                <tr key={staff.user_id}>
                  <td>{staff?.user_id}</td>
                  <td>
                    <img
                      src={
                        staff?.avatar ||
                        'https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Flogo.png?alt=media&token=ff560732-bd5c-43d0-9271-7bcd3d9204ea'
                      }
                      alt={staff?.username}
                      className="w-[68px] h-[50px] object-contain rounded-md bg-primary"
                    />
                  </td>
                  <td>{staff?.username}</td>
                  <td>{new Date(staff.created_at).toLocaleDateString()}</td>
                  <td>{getStatus(staff?.status)}</td>
                  <MdModeEditOutline
                    className="cursor-pointer text-primary"
                    style={{ marginTop: '30px' }}
                    fontSize={25}
                    onClick={() =>
                      navigate(`/admin/user-staff/${staff?.user_id}`)
                    }
                  />
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllStaff
