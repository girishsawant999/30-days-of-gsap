"use client";
import ReloadButton from "@/components/ReloadButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import {
  CalendarDaysIcon,
  ClipboardList,
  LayoutPanelLeft,
  MessageCircleMoreIcon,
  MessageSquare,
  Phone,
  Route,
  Search,
  Settings2,
  Settings2Icon,
  UserCircle2Icon,
  WalletCardsIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import MapImage from "./assets/map.png";
import TruckImage from "./assets/truck.png";

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

const MotionPathTutorial = () => {
  const track = useRef<SVGPathElement>(null);
  const timeline = useRef<ReturnType<typeof gsap.timeline>>(null);

  useGSAP(() => {
    if (!track.current) return;

    gsap.to(".blink", {
      opacity: 0.5,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
    });

    gsap.fromTo(
      ".card",
      {
        autoAlpha: 0,
        y: 100,
      },
      {
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        stagger: {
          amount: 0.2,
        },
        duration: 0.3,
      }
    );

    timeline.current = gsap.timeline({
      defaults: {
        duration: 10,
        ease: "power2.out",
      },
    });

    timeline.current
      .from(track.current, {
        drawSVG: 0,
      })
      .to(
        ".plane",
        {
          overwrite: true,
          motionPath: {
            path: track.current,
            align: track.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: 360,
          },
        },
        "<"
      )
      .to(
        ".plane",
        {
          duration: 4,
          opacity: 0,
        },
        6
      );
  });

  return (
    <section className="min-h-screen  bg-background text-foreground grid place-items-stretch   md:grid-cols-[105px_auto_1fr] font-sans relative">
      <div className="z-10 sidebar bg-white border-t-0 border-r border-b-0 border-l-0 border-[#e8e8e8] flex flex-row md:flex-col gap-4 shadow-[0px_20px_50px_0_rgba(220,224,249,0.5)] p-4 md:p-[22px]">
        <Link href="/">
          <svg
            width="61"
            height="67"
            viewBox="0 0 61 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-12 md:size-16"
          >
            <path
              d="M46.7362 14.9892L31.9779 23.5375C31.3837 23.8825 30.6362 23.8825 30.0229 23.5375L15.2646 14.9892C14.2104 14.3759 13.9421 12.9384 14.7471 12.0375C15.3029 11.405 15.9354 10.8875 16.6062 10.5234L26.9946 4.77336C29.2179 3.52753 32.8212 3.52753 35.0446 4.77336L45.4329 10.5234C46.1037 10.8875 46.7362 11.4242 47.2921 12.0375C48.0587 12.9384 47.7904 14.3759 46.7362 14.9892Z"
              fill="#5932EA"
            />
            <path
              d="M29.9084 27.1015V40.1731C29.9084 41.6298 28.4326 42.5881 27.1293 41.9556C23.1809 40.0198 16.5301 36.3973 16.5301 36.3973C14.1918 35.0748 12.2751 31.7398 12.2751 28.999V19.109C12.2751 17.5948 13.8659 16.6365 15.1693 17.384L28.9501 25.3765C29.5251 25.7406 29.9084 26.3923 29.9084 27.1015Z"
              fill="#5932EA"
            />
            <path
              d="M32.0931 27.1015V40.1731C32.0931 41.6298 33.5689 42.5881 34.8722 41.9556C38.8206 40.0198 45.4714 36.3973 45.4714 36.3973C47.8097 35.0748 49.7264 31.7398 49.7264 28.999V19.109C49.7264 17.5948 48.1356 16.6365 46.8322 17.384L33.0514 25.3765C32.4764 25.7406 32.0931 26.3923 32.0931 27.1015Z"
              fill="#5932EA"
            />
            <path
              d="M1.76 56.952H0.384V55.16H1.76V52.76H3.856V55.16H5.776V56.952H3.856V59.992C3.856 60.1733 3.872 60.344 3.904 60.504C3.94667 60.6533 4.02133 60.7813 4.128 60.888C4.27733 61.0587 4.49067 61.144 4.768 61.144C4.94933 61.144 5.09333 61.128 5.2 61.096C5.30667 61.0533 5.408 61 5.504 60.936L6.096 62.776C5.85067 62.8933 5.584 62.9787 5.296 63.032C5.01867 63.096 4.70933 63.128 4.368 63.128C3.97333 63.128 3.616 63.0693 3.296 62.952C2.98667 62.824 2.72533 62.6533 2.512 62.44C2.01067 61.96 1.76 61.2773 1.76 60.392V56.952ZM7.47787 55.16H9.44587V56.248H9.57387C9.66987 56.056 9.79788 55.88 9.95788 55.72C10.1179 55.56 10.2939 55.4213 10.4859 55.304C10.6885 55.1867 10.9019 55.096 11.1259 55.032C11.3605 54.968 11.5899 54.936 11.8139 54.936C12.0912 54.936 12.3259 54.9627 12.5179 55.016C12.7205 55.0693 12.8912 55.1387 13.0299 55.224L12.4699 57.128C12.3419 57.064 12.1979 57.016 12.0379 56.984C11.8885 56.9413 11.7019 56.92 11.4779 56.92C11.1899 56.92 10.9285 56.9787 10.6939 57.096C10.4592 57.2027 10.2565 57.3573 10.0859 57.56C9.92588 57.7627 9.79788 58.0027 9.70187 58.28C9.61654 58.5467 9.57387 58.84 9.57387 59.16V63H7.47787V55.16ZM18.673 62.168H18.545C18.2997 62.4667 18.001 62.7227 17.649 62.936C17.3077 63.1493 16.865 63.256 16.321 63.256C15.9157 63.256 15.5317 63.1867 15.169 63.048C14.817 62.92 14.5077 62.7387 14.241 62.504C13.9743 62.2693 13.7663 61.9867 13.617 61.656C13.4677 61.3253 13.393 60.9627 13.393 60.568C13.393 60.1627 13.473 59.8 13.633 59.48C13.793 59.1493 14.017 58.8667 14.305 58.632C14.593 58.3973 14.929 58.2213 15.313 58.104C15.7077 57.976 16.1343 57.912 16.593 57.912C17.105 57.912 17.5263 57.9547 17.857 58.04C18.1877 58.1147 18.4597 58.1947 18.673 58.28V58.04C18.673 57.624 18.5077 57.2827 18.177 57.016C17.8463 56.7387 17.4357 56.6 16.945 56.6C16.2197 56.6 15.6063 56.904 15.105 57.512L13.585 56.472C14.417 55.4267 15.553 54.904 16.993 54.904C18.209 54.904 19.137 55.192 19.777 55.768C20.417 56.3333 20.737 57.176 20.737 58.296V63H18.673V62.168ZM18.673 59.816C18.4277 59.6987 18.1717 59.608 17.905 59.544C17.649 59.4693 17.3663 59.432 17.057 59.432C16.5557 59.432 16.1663 59.544 15.889 59.768C15.6223 59.9813 15.489 60.248 15.489 60.568C15.489 60.888 15.617 61.144 15.873 61.336C16.1397 61.528 16.4437 61.624 16.785 61.624C17.0623 61.624 17.3183 61.576 17.553 61.48C17.7877 61.3733 17.985 61.24 18.145 61.08C18.3157 60.9093 18.4437 60.7173 18.529 60.504C18.625 60.28 18.673 60.0507 18.673 59.816ZM29.9254 61C29.584 61.6613 29.104 62.2053 28.4854 62.632C27.8774 63.048 27.1147 63.256 26.1974 63.256C25.5894 63.256 25.0294 63.1547 24.5174 62.952C24.016 62.7387 23.5787 62.4453 23.2054 62.072C22.8427 61.6987 22.5547 61.2613 22.3414 60.76C22.1387 60.248 22.0374 59.688 22.0374 59.08C22.0374 58.472 22.1387 57.912 22.3414 57.4C22.5547 56.888 22.8427 56.4507 23.2054 56.088C23.5787 55.7147 24.016 55.4267 24.5174 55.224C25.0294 55.0107 25.5894 54.904 26.1974 54.904C27.104 54.904 27.8667 55.112 28.4854 55.528C29.104 55.944 29.5574 56.4827 29.8454 57.144L27.9254 57.944C27.744 57.5813 27.5094 57.3093 27.2214 57.128C26.944 56.936 26.592 56.84 26.1654 56.84C25.888 56.84 25.6267 56.8933 25.3814 57C25.136 57.1067 24.9174 57.256 24.7254 57.448C24.544 57.64 24.4 57.8747 24.2934 58.152C24.1867 58.4293 24.1334 58.7387 24.1334 59.08C24.1334 59.4213 24.1867 59.7307 24.2934 60.008C24.4 60.2853 24.544 60.52 24.7254 60.712C24.9174 60.904 25.136 61.0533 25.3814 61.16C25.6267 61.2667 25.888 61.32 26.1654 61.32C26.6027 61.32 26.9707 61.224 27.2694 61.032C27.5787 60.8293 27.824 60.5413 28.0054 60.168L29.9254 61ZM31.3641 51.544H33.4601V57.784H33.5561L36.1801 55.16H38.7721V55.288L35.8601 58.12L39.0121 62.872V63H36.5321L34.3881 59.56L33.4601 60.472V63H31.3641V51.544ZM41.9125 52.456C41.9125 52.744 41.8112 52.9893 41.6085 53.192C41.4058 53.3947 41.1605 53.496 40.8725 53.496C40.5845 53.496 40.3392 53.3947 40.1365 53.192C39.9338 52.9893 39.8325 52.744 39.8325 52.456C39.8325 52.168 39.9338 51.9227 40.1365 51.72C40.3392 51.5173 40.5845 51.416 40.8725 51.416C41.1605 51.416 41.4058 51.5173 41.6085 51.72C41.8112 51.9227 41.9125 52.168 41.9125 52.456ZM41.6085 55.16V63H40.1365V55.16H41.6085ZM43.6841 55.16H45.0921V56.248H45.1561C45.3801 55.864 45.7215 55.544 46.1801 55.288C46.6495 55.032 47.1348 54.904 47.6361 54.904C48.5961 54.904 49.3321 55.1813 49.8441 55.736C50.3668 56.28 50.6281 57.0587 50.6281 58.072V63H49.1561V58.168C49.1241 56.888 48.4788 56.248 47.2201 56.248C46.6335 56.248 46.1428 56.488 45.7481 56.968C45.3535 57.4373 45.1561 58.0027 45.1561 58.664V63H43.6841V55.16ZM55.9579 61.912C56.6832 61.912 57.2752 61.6507 57.7339 61.128C58.2139 60.6053 58.4539 59.9227 58.4539 59.08C58.4539 58.2587 58.2139 57.5813 57.7339 57.048C57.2645 56.5147 56.6725 56.248 55.9579 56.248C55.2539 56.248 54.6619 56.5147 54.1819 57.048C53.7019 57.5813 53.4619 58.2587 53.4619 59.08C53.4619 59.912 53.7019 60.5893 54.1819 61.112C54.6619 61.6453 55.2539 61.912 55.9579 61.912ZM55.9099 66.712C55.4725 66.712 55.0619 66.6533 54.6779 66.536C54.2939 66.4293 53.9419 66.2747 53.6219 66.072C53.3125 65.8693 53.0459 65.6293 52.8219 65.352C52.5979 65.0747 52.4272 64.7653 52.3099 64.424L53.7019 63.848C53.8619 64.3067 54.1392 64.6747 54.5339 64.952C54.9285 65.2293 55.3872 65.368 55.9099 65.368C56.7099 65.368 57.3339 65.128 57.7819 64.648C58.2299 64.168 58.4539 63.5067 58.4539 62.664V61.912H58.3899C58.1125 62.328 57.7339 62.6587 57.2539 62.904C56.7845 63.1387 56.2725 63.256 55.7179 63.256C54.6939 63.256 53.8139 62.856 53.0779 62.056C52.3525 61.2347 51.9899 60.2427 51.9899 59.08C51.9899 57.9173 52.3525 56.9307 53.0779 56.12C53.8139 55.3093 54.6939 54.904 55.7179 54.904C56.2725 54.904 56.7845 55.0267 57.2539 55.272C57.7339 55.5067 58.1125 55.832 58.3899 56.248H58.4539V55.16H59.8619V62.664C59.8619 63.9227 59.5045 64.9093 58.7899 65.624C58.0645 66.3493 57.1045 66.712 55.9099 66.712Z"
              fill="black"
            />
          </svg>
        </Link>

        <div className="flex-col justify-center gap-4 mt-10 text-gray-700 hidden md:flex">
          <div className=" size-14  grid place-items-center">
            <LayoutPanelLeft size={24} />
          </div>
          <div className="rounded-lg bg-[#5932ea] size-14 shadow-[0px_8px_12px_0_rgba(135,145,233,0.3)] text-white grid place-items-center">
            <Route size={24} />
          </div>
          <div className=" size-14  grid place-items-center">
            <MessageCircleMoreIcon size={24} />
          </div>
          <div className=" size-14  grid place-items-center">
            <ClipboardList size={24} />
          </div>
          <div className=" size-14  grid place-items-center">
            <WalletCardsIcon size={24} />
          </div>
          <div className=" size-14  grid place-items-center">
            <CalendarDaysIcon size={24} />
          </div>
          <div className=" size-14  grid place-items-center">
            <UserCircle2Icon size={24} />
          </div>
          <div className=" size-14  grid place-items-center">
            <Settings2Icon size={24} />
          </div>
        </div>

        <div className="ms-auto md:mt-auto">
          <div className="rounded-full bg-[#5932ea] grid place-items-center size-12 md:size-14">
            <span className="text-white font-semibold text-lg">GS</span>
          </div>
        </div>
      </div>
      <div className="z-10 content flex flex-col gap-7 p-10 bg-[#f6f6f4] backdrop-blur-xs min-h-screen">
        <div className="relative bg-white border-[#ECEEF6] border rounded-md text-[#c6c6c6] p-1">
          <Search
            size={12}
            className="absolute top-1/2 -translate-1/2 left-3"
          />
          <input
            className="outline-none text-sm border-none bg-transparent ps-6"
            placeholder="Search"
          />
          <Settings2
            size={16}
            className="absolute top-1/2 -translate-1/2 right-0"
          />
        </div>
        <h2 className="text-xl font-bold text-left text-black ">
          Ongoing Delivery
        </h2>
        <div className="flex flex-col justify-center gap-6">
          <div className="p-5 border-2 card invisible border-[#5932EA] rounded-xl bg-white flex flex-col gap-6">
            <div className="flex  justify-between gap-5">
              <div className="flex flex-col gap-1">
                <p className=" text-lg font-bold text-left text-[#232323]">
                  EV-2017002346
                </p>
                <div className="flex justify-start items-center gap-[13px]">
                  <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#b0b0b0]">
                    Shipment number
                  </p>
                </div>

                <p className="text-sm text-left text-[#484a58]">
                  Food Materials
                </p>
              </div>
              <Image
                alt="Truck Image"
                src={TruckImage}
                width={152}
                height={58}
              />
            </div>

            <hr className="border-[#ECECEC]" />

            <div className="flex flex-col gap-8 relative">
              <div className="flex items-center gap-3">
                <svg
                  width={38}
                  height={38}
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <circle cx={19} cy={19} r={19} fill="#E8F9EE" />
                  <circle cx={19} cy={19} r={7} fill="#0EBC93" />
                </svg>
                <div>
                  <p className="text-base font-bold text-left text-[#232323]">
                    2972 Westheimer
                  </p>
                  <p className="text-xs text-left text-[#b0b0b0]">
                    Rd. Santa Ana, Illinois 85486
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  width={38}
                  height={38}
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                  preserveAspectRatio="none"
                >
                  <circle cx={19} cy={19} r={19} fill="#E5E5FE" />
                  <path
                    d="M27.62 15.45C26.57 10.83 22.54 8.75 19 8.75C19 8.75 19 8.75 18.99 8.75C15.46 8.75 11.42 10.82 10.37 15.44C9.2 20.6 12.36 24.97 15.22 27.72C16.28 28.74 17.64 29.25 19 29.25C20.36 29.25 21.72 28.74 22.77 27.72C25.63 24.97 28.79 20.61 27.62 15.45ZM19 20.46C17.26 20.46 15.85 19.05 15.85 17.31C15.85 15.57 17.26 14.16 19 14.16C20.74 14.16 22.15 15.57 22.15 17.31C22.15 19.05 20.74 20.46 19 20.46Z"
                    fill="#5251FA"
                  />
                </svg>
                <div>
                  <p className="text-base font-bold text-left text-[#232323]">
                    8502 Preston
                  </p>
                  <p className="text-xs text-left text-[#b0b0b0]">
                    Rd. Inglewood, Maine 98380
                  </p>
                </div>
              </div>

              <hr className="border-[#ECECEC]" />

              <div className="flex items-center gap-4 w-full">
                <div className="flex flex-col">
                  <p className="text-base font-bold text-left text-[#232323]">
                    Darrell Steward
                  </p>
                  <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#b0b0b0]">
                    Client
                  </p>
                  <p className="text-sm text-left text-[#484a58]">
                    Mariene, LTD
                  </p>
                </div>
                <div className="bg-[#F7F5FF] rounded-md grid place-items-center p-1.5 ms-auto">
                  <Phone
                    size={24}
                    strokeWidth={1.5}
                    className="text-[#5932EA]"
                  />
                </div>
                <div className="bg-[#F7F5FF] rounded-md grid place-items-center p-1.5">
                  <MessageSquare
                    size={24}
                    strokeWidth={1.5}
                    className="text-[#5932EA]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 border-2 card invisible border-[#fff] rounded-xl bg-white flex flex-col gap-6">
            <div className="flex  justify-between gap-5">
              <div className="flex flex-col gap-1">
                <p className=" text-lg font-bold text-left text-[#232323]">
                  EV-2017003323
                </p>
                <div className="flex justify-start items-center gap-[13px]">
                  <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#b0b0b0]">
                    Shipment number
                  </p>
                </div>

                <p className="text-sm text-left text-[#484a58]">
                  Food Materials
                </p>
              </div>
              <Image
                alt="Truck Image"
                src={TruckImage}
                width={152}
                height={58}
              />
            </div>

            <hr className="border-[#ECECEC]" />

            <div className="flex flex-col gap-8 relative">
              <div className="flex items-center gap-3">
                <svg
                  width={38}
                  height={38}
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <circle cx={19} cy={19} r={19} fill="#E8F9EE" />
                  <circle cx={19} cy={19} r={7} fill="#0EBC93" />
                </svg>
                <div>
                  <p className="text-base font-bold text-left text-[#232323]">
                    2972 Westheimer
                  </p>
                  <p className="text-xs text-left text-[#b0b0b0]">
                    Rd. Santa Ana, Illinois 85486
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  width={38}
                  height={38}
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                  preserveAspectRatio="none"
                >
                  <circle cx={19} cy={19} r={19} fill="#E5E5FE" />
                  <path
                    d="M27.62 15.45C26.57 10.83 22.54 8.75 19 8.75C19 8.75 19 8.75 18.99 8.75C15.46 8.75 11.42 10.82 10.37 15.44C9.2 20.6 12.36 24.97 15.22 27.72C16.28 28.74 17.64 29.25 19 29.25C20.36 29.25 21.72 28.74 22.77 27.72C25.63 24.97 28.79 20.61 27.62 15.45ZM19 20.46C17.26 20.46 15.85 19.05 15.85 17.31C15.85 15.57 17.26 14.16 19 14.16C20.74 14.16 22.15 15.57 22.15 17.31C22.15 19.05 20.74 20.46 19 20.46Z"
                    fill="#5251FA"
                  />
                </svg>
                <div>
                  <p className="text-base font-bold text-left text-[#232323]">
                    8502 Preston
                  </p>
                  <p className="text-xs text-left text-[#b0b0b0]">
                    Rd. Inglewood, Maine 98380
                  </p>
                </div>
              </div>

              <hr className="border-[#ECECEC]" />

              <div className="flex items-center gap-4 w-full">
                <div className="flex flex-col">
                  <p className="text-base font-bold text-left text-[#232323]">
                    Jenny Wilson
                  </p>
                  <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#b0b0b0]">
                    Client
                  </p>
                  <p className="text-sm text-left text-[#484a58]">
                    Mariene, LTD
                  </p>
                </div>
                <div className="bg-[#F7F5FF] rounded-md grid place-items-center p-1.5 ms-auto">
                  <Phone
                    size={24}
                    strokeWidth={1.5}
                    className="text-[#5932EA]"
                  />
                </div>
                <div className="bg-[#F7F5FF] rounded-md grid place-items-center p-1.5">
                  <MessageSquare
                    size={24}
                    strokeWidth={1.5}
                    className="text-[#5932EA]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="map grid place-items-center relative min-h-screen">
        <div className="absolute right-10 top-10 z-50">
          <ReloadButton onReload={() => timeline.current?.restart()} />
        </div>
        <Image
          alt="Map Image"
          src={MapImage}
          fill
          className="object-cover object-center"
        />
        <svg
          width={702}
          height={994}
          viewBox="0 0 702 994"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="object-cover object-center absolute"
          preserveAspectRatio="none"
        >
          <path
            d="M243 191.5L271.988 197.781C272.652 197.925 273.26 198.23 273.774 198.673C285.032 208.376 310.306 226.718 327.5 227.5C342.606 228.187 354.128 233.097 359.724 236.477C361.14 237.333 361.696 239.048 361.235 240.637L327.5 357L300.669 438.451C300.011 440.449 301.002 442.612 302.956 443.391C323.727 451.671 361.919 465.512 372.5 464C386.5 462 440.5 439.5 460.5 424C472.643 414.59 487.377 397.289 493.776 389.493C495.431 387.477 498.533 387.52 499.834 389.782C510.006 407.461 513.247 439.924 521.5 464C530.506 490.272 541.409 512.599 536 513"
            stroke="#5932EA"
            strokeWidth={4}
            ref={track}
          />
          <path
            d="M243 191.5L271.988 197.781C272.652 197.925 273.26 198.23 273.774 198.673C285.032 208.376 310.306 226.718 327.5 227.5C342.606 228.187 354.128 233.097 359.724 236.477C361.14 237.333 361.696 239.048 361.235 240.637L327.5 357L300.669 438.451C300.011 440.449 301.002 442.612 302.956 443.391C323.727 451.671 361.919 465.512 372.5 464C386.5 462 440.5 439.5 460.5 424C472.643 414.59 487.377 397.289 493.776 389.493C495.431 387.477 498.533 387.52 499.834 389.782C510.006 407.461 513.247 439.924 521.5 464C530.506 490.272 541.409 512.599 536 513"
            stroke="#5932EA"
            strokeWidth={13}
            strokeOpacity={0.5}
          />
          <circle
            cx={243}
            cy={192}
            r={12}
            fill="#32EA57"
            fillOpacity="0.2"
            className="blink"
          />
          <circle cx={243} cy={192} r={7} fill="#32EA57" />

          <path
            d="M268 192C268 205.807 256.807 217 243 217C229.193 217 218 205.807 218 192C218 178.193 229.193 167 243 167C256.807 167 268 178.193 268 192Z"
            fill="#5932EA"
            fillOpacity="0.3"
            className="plane blink"
          />
          <path
            d="M260 192C260 201.389 252.389 209 243 209C233.611 209 226 201.389 226 192C226 182.611 233.611 175 243 175C252.389 175 260 182.611 260 192Z"
            fill="#5932EA"
            className="plane"
          />
          <path
            d="M255 192.562L234 183L236.917 192.562L234 201L255 192.562Z"
            fill="white"
            className="plane"
          />

          <path
            d="M557 513C557 524.046 548.046 533 537 533C525.954 533 517 524.046 517 513C517 501.954 525.954 493 537 493C548.046 493 557 501.954 557 513Z"
            fill="#5932EA"
            fillOpacity="0.3"
            className="blink"
          />
          <path
            d="M549.941 513C549.941 520.147 544.147 525.941 537 525.941C529.853 525.941 524.059 520.147 524.059 513C524.059 505.853 529.853 500.059 537 500.059C544.147 500.059 549.941 505.853 549.941 513Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M536.807 503.792C538.705 503.792 540.658 504.361 542.14 505.43C543.626 506.5 544 508.08 544 510.085C544 511.101 543.718 512.348 543 513.751C542.278 515.162 541.748 516.76 540.791 518.147C539.832 519.536 538.874 520.803 538.156 521.722C537.797 522.182 537.498 522.556 537.288 522.814C537.183 522.943 537.101 523.044 537.044 523.112C537.016 523.146 536.995 523.172 536.98 523.19C536.973 523.199 536.967 523.205 536.963 523.21C536.961 523.212 536.959 523.215 536.959 523.215L536.958 523.216L536.804 523.401L536.654 523.213L536.652 523.211C536.652 523.211 536.65 523.208 536.648 523.206C536.645 523.202 536.639 523.195 536.632 523.186C536.618 523.168 536.597 523.141 536.57 523.106C536.515 523.037 536.434 522.934 536.332 522.803C536.128 522.539 535.835 522.159 535.484 521.691C534.781 520.756 533.842 519.47 532.897 518.069C531.951 516.669 531.231 515.4 530.5 514C529.774 512.608 529.552 511.046 529.5 510.085C529.5 508.053 529.993 506.523 531.5 505.43C533.005 504.337 534.906 503.792 536.807 503.792ZM536.604 508.053C535.305 508.053 534.253 509.145 534.253 510.492C534.253 511.838 535.305 512.93 536.604 512.93C537.903 512.93 538.956 511.838 538.956 510.492C538.956 509.145 537.903 508.053 536.604 508.053Z"
            fill="#5932EA"
          />
        </svg>
      </div>
    </section>
  );
};

export default MotionPathTutorial;
