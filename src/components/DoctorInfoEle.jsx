import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDoctorInfo } from "../redux/thunk";
import { FormattedMessage } from "react-intl";
import "../scss/doctorInfoEle.scss";

const DoctorInfoEle = () => {
  const params = useParams();
  const doctorInfos = useSelector(
    (state) => state.userSystemReducer.doctorInfo
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getDoctorInfo(params.idDoctor));
  }, []);

  const openDetail = (e) => {
    setOpen(true);
  };
  const closeDetail = (e) => {
    setOpen(false);
  };

  return (
    <div className="doctorInfoEle">
      <h3>
        <FormattedMessage id="doctorInfoEle.examinationAddress" />
      </h3>
      <p className="name">{doctorInfos.nameClinic}</p>
      <p className="address">{doctorInfos.addressClinic}</p>

      <div className="price">
        <h3>
          <FormattedMessage id="doctorInfoEle.examinationPrice" />{" "}
        </h3>

        {!open ? (
          <>
            <p>
              {doctorInfos.priceData?.valueVi} đ.
              <span onClick={openDetail}>
                <FormattedMessage id="doctorInfoEle.seeDetails" />
              </span>
            </p>
          </>
        ) : (
          <>
            <span onClick={closeDetail}>
              <FormattedMessage id="doctorInfoEle.collapse" />
            </span>
            <div className="border">
              <div className="left">
                <p>
                  Đặt khám bệnh qua app được ưu tiên khi xét duyệt, giá khám cho
                  người nước ngoài {doctorInfos.priceData?.valueEn} USD
                </p>
                <p>
                  Người bệnh có thể thanh toán qua{" "}
                  {doctorInfos.paymentData?.valueVi} hình thức
                </p>
              </div>
              <div className="right">
                <p>{doctorInfos.priceData?.valueVi} đ.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorInfoEle;
