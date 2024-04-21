"use client";
import { useTimer } from "react-timer-hook";
import OTPInput from "react-otp-input";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { VscAccount } from "react-icons/vsc";

export default function Home() {
  const [formstep, setFormstep] = useState(0);
  const [phonenum, setphonenum] = useState();
  const [otp, setOtp] = useState("");

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 120); // 10 minutes timer

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {},
  });
  return (
    // <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
    //   <div className="w-1/3 mx-auto justify-center bg-gray-300 min-h-96 text-center p-5 rounded shadow-slate-600 shadow-sm">
    //     <h2 className="text-3xl">Welcome to website</h2>
    //     {formstep == 0 && (
    //       <>
    //         <div className={`block m-7`}>
    //           <div>
    //             <div>
    //               <Formik
    //                 initialValues={{}}
    //                 onSubmit={async (values) => {
    //                   setOtp("");
    //                   restart(expiryTimestamp);
    //                   try {
    //                     const res = await axios.post(
    //                       `http://192.168.1.110:3000/auth/login`,
    //                       {
    //                         mobile: values.phoneNumber,
    //                         level: "1",
    //                         otp_code: null,
    //                       }
    //                     );
    //                     if (res.data.opt_status == 200) {
    //                       toast.success("code sended!");
    //                       setFormstep(1);
    //                     } else {
    //                       toast.error(
    //                         "مشکلی رخ داده! مجددا تلاش کنید"
    //                       );
    //                     }
    //                   } catch (error) {
    //                     toast.error("مشکلی رخ داده! مجددا تلاش کنید");
    //                   }
    //                 }}
    //               >
    //                 {({ values, errors, touched }) => (
    //                   <Form noValidate>
    //                     <div
    //                       className={`position-relative d-block`}
    //                     >
    //                       <label className="block mb-2 text-pretty">
    //                         Enter your phone number
    //                       </label>
    //                       <Field
    //                         name="phoneNumber"
    //                         id="phone"
    //                         pattern="[0-9]*"
    //                         inputMode="numeric"
    //                         autoComplete="off"
    //                         maxLength={11}
    //                         placeholder="Phone Number"
    //                         onKeyUp={(e) => {
    //                           setphonenum(e?.target?.value);
    //                         }}
    //                         className={"p-2 rounded-sm mb-5"}
    //                       />
    //                     </div>
    //                     <div></div>
    //                     <div>
    //                       <button
    //                         type="submit"
    //                         className="bg-stone-600 text-gray-50 p-2 rounded-sm mt-3"
    //                       >
    //                         get varification code
    //                       </button>
    //                     </div>
    //                   </Form>
    //                 )}
    //               </Formik>
    //             </div>
    //           </div>
    //         </div>
    //       </>
    //     )}
    //     {formstep === 1 && (
    //       <>
    //         <h3 className={`text-2xl`}>Enter verification code</h3>
    //         <div>
    //           <Formik
    //             initialValues={{}}
    //             onSubmit={async (values) => {
    //               restart(expiryTimestamp);
    //               try {
    //                 const res = await axios.post(
    //                   `http://192.168.1.110:3000/auth/login`,
    //                   {
    //                     mobile: phonenum,
    //                     level: "2",
    //                     otp_code: otp,
    //                   }
    //                 );
    //                 if (res.data.ok == true) {
    //                   toast.success("login successfully!");
    //                   localStorage.setItem("token", res.data.access_token);
    //                 } else {
    //                   toast.error("مشکلی رخ داده! مجددا تلاش کنید");
    //                 }
    //               } catch (error) {
    //                 toast.error("مشکلی رخ داده! مجددا تلاش کنید");
    //               }
    //             }}
    //           >
    //             {({ values, errors, touched }) => (
    //               <Form>
    //                 <div className="my-6">
    //                   {minutes + seconds > 0 ? (
    //                     <h6>
    //                       remainding time: {minutes}:{seconds}{" "}
    //                     </h6>
    //                   ) : (
    //                     <h6
    //                       className={`bg-stone-600 text-gray-50 p-2 rounded-sm mt-3 max-w-[350px] mx-auto`}
    //                       onClick={async () => {
    //                         setOtp("");
    //                         restart(expiryTimestamp);
    //                         try {
    //                           const res = await axios.post(
    //                             `http://192.168.1.110:3000/auth/login`,
    //                             {
    //                               mobile: phonenum,
    //                               level: "1",
    //                               otp_code: null,
    //                             }
    //                           );
    //                           if (res.data.opt_status == 200) {
    //                             toast.success("code sended!");
    //                             setFormstep(1);
    //                           } else {
    //                             toast.error(
    //                               "مشکلی رخ داده! مجددا تلاش کنید"
    //                             );
    //                           }
    //                         } catch (error) {
    //                           toast.error(
    //                             "مشکلی رخ داده! مجددا تلاش کنید"
    //                           );
    //                         }
    //                       }}
    //                     >
    //                       {"resend verification code"}
    //                     </h6>
    //                   )}
    //                 </div>
    //                 <div className={`justify-center ${styles.inputcontent}`}>
    //                   <OTPInput
    //                     value={otp}
    //                     onChange={setOtp}
    //                     numInputs={6}
    //                     renderSeparator={<span>-</span>}
    //                     renderInput={(props) => (
    //                       <input
    //                         {...props}
    //                         inputMode="numeric"
    //                         onKeyDownCapture={(event) => {
    //                           if (
    //                             !/^[0-9\b]+$/.test(event.key) &&
    //                             event.key != "Backspace" &&
    //                             event.key != "Delete"
    //                           ) {
    //                             event.preventDefault();
    //                           }
    //                         }}
    //                       />
    //                     )}
    //                   />
    //                 </div>

    //                 {otp.length < 6 ? (
    //                   <div>
    //                     <button
    //                       disabled
    //                       className="bg-stone-400 text-gray-50 p-2 rounded-sm mt-3"
    //                     >
    //                       submit
    //                     </button>
    //                   </div>
    //                 ) : (
    //                   <div>
    //                     <button
    //                       type="submit"
    //                       className="bg-stone-600 text-gray-50 p-2 rounded-sm mt-3"
    //                     >
    //                       submit
    //                     </button>
    //                   </div>
    //                 )}
    //               </Form>
    //             )}
    //           </Formik>
    //         </div>
    //       </>
    //     )}
    //   </div>
    // </main>
    <div className={`flex min-h-screen flex-col  bg-gray-50 ${styles.container}`}>
      <div className={styles.logo}>
        <Image src={`/1.png`} className="pointer" alt="logo" width="320" height="102" />
      </div>
      <div className={styles.container}>
        <div className={styles.form}>
          {formstep == 0 && (
          <>
            <div className={`block m-7`}>
              <div>
                <div>
                  <Formik
                    initialValues={{}}
                    onSubmit={async (values) => {
                      setOtp("");
                      restart(expiryTimestamp);
                      try {
                        const res = await axios.post(
                          `http://192.168.1.110:3000/auth/login`,
                          {
                            mobile: values.phoneNumber,
                            level: "1",
                            otp_code: null,
                          }
                        );
                        if (res.data.opt_status == 200) {
                          toast.success("کد فعالسازی ارسال شد!");
                          setFormstep(1);
                        } else {
                          toast.error(
                            "مشکلی رخ داده! مجددا تلاش کنید"
                          );
                        }
                      } catch (error) {
                        toast.error("مشکلی رخ داده! مجددا تلاش کنید");
                      }
                    }}
                  >
                    {({ values, errors, touched }) => (
                      <Form noValidate>
          <h3 className={styles.title}>ورود / ثبت نام </h3>
                        <div
                          className={`position-relative d-block`}
                        >
                          <VscAccount className={styles.loginsvg}/>
                          <Field
                            name="phoneNumber"
                            id="phone"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            autoComplete="off"
                            maxLength={11}
                            placeholder="شماره موبایل، ایمیل، نام کاربری ..."
                            onKeyUp={(e) => {
                              setphonenum(e?.target?.value);
                            }}
                            className={`${styles.inputstyle}`}
                          />
                        </div>
                        <div></div>
                        <div>
                          <button
                            type="submit"
                            className={styles.btn}
                          >
                            ورود به راست چین
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </>
        )}
{formstep === 1 && (
          <>
            <h3 className={`${styles.otptitle}`}>اعتبارسنجی</h3>
            <h6 className={styles.otpdes}> لطفا کد اعتبارسنجی ارسال شده به موبایل خود را در کادر زیر وارد نمایید. </h6>
            <div>
              <Formik
                initialValues={{}}
                onSubmit={async (values) => {
                  restart(expiryTimestamp);
                  try {
                    const res = await axios.post(
                      `http://192.168.1.110:3000/auth/login`,
                      {
                        mobile: phonenum,
                        level: "2",
                        otp_code: otp,
                      }
                    );
                    if (res.data.ok == true) {
                      toast.success("با موفقیت وارد شدید!");
                      localStorage.setItem("token", res.data.access_token);
                    } else {
                      toast.error("مشکلی رخ داده! مجددا تلاش کنید");
                    }
                  } catch (error) {
                    toast.error("مشکلی رخ داده! مجددا تلاش کنید");
                  }
                }}
              >
                {({ values, errors, touched }) => (
                  <Form>
                    <div className="my-6">
                      {minutes + seconds > 0 ? (
                        <h6 className="text-center text-gray-500 text-base">
                          زمان باقی مانده: {minutes}:{seconds}{" "}
                        </h6>
                      ) : (
                        <h6
                          className={`${styles.resendcode}`}
                          onClick={async () => {
                            setOtp("");
                            restart(expiryTimestamp);
                            try {
                              const res = await axios.post(
                                `http://192.168.1.110:3000/auth/login`,
                                {
                                  mobile: phonenum,
                                  level: "1",
                                  otp_code: null,
                                }
                              );
                              if (res.data.opt_status == 200) {
                                toast.success("کد تایید ارسال شد!");
                                setFormstep(1);
                              } else {
                                toast.error(
                                  "مشکلی رخ داده! مجددا تلاش کنید"
                                );
                              }
                            } catch (error) {
                              toast.error(
                                "مشکلی رخ داده! مجددا تلاش کنید"
                              );
                            }
                          }}
                        >
                          {"ارسال مجدد کد"}
                        </h6>
                      )}
                    </div>
                    <div className={`justify-center ${styles.inputcontent}`}>
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => (
                          <input
                            {...props}
                            inputMode="numeric"
                            onKeyDownCapture={(event) => {
                              if (
                                !/^[0-9\b]+$/.test(event.key) &&
                                event.key != "Backspace" &&
                                event.key != "Delete"
                              ) {
                                event.preventDefault();
                              }
                            }}
                          />
                        )}
                      />
                    </div>

                    {otp.length < 6 ? (
                      <div>
                        <button
                          disabled
                          className={styles.btn}
                        >
                          ورود
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="submit"
                          className={styles.btn}
                        >
                          ورود
                        </button>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </>
        )}
</div>

        </div>
      </div>
  );
}
