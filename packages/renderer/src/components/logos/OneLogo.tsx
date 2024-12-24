import { motion } from "framer-motion";

const OneLogo = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 1,
              ease: "easeInOut",
            },
          },
        }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="448"
          height="207"
          viewBox="0 0 448 207"
        >
          <path
            d="M395.628 186.06C384.217 186.06 374.368 183.811 366.082 179.313C357.844 174.767 351.499 168.304 347.048 159.923C342.645 151.495 340.443 141.481 340.443 129.881C340.443 118.612 342.669 108.763 347.119 100.335C351.57 91.8599 357.844 85.2784 365.94 80.5909C374.037 75.8561 383.578 73.4886 394.562 73.4886C402.328 73.4886 409.43 74.696 415.869 77.1108C422.309 79.5256 427.872 83.1004 432.56 87.8352C437.247 92.5701 440.893 98.4176 443.497 105.378C446.101 112.291 447.403 120.222 447.403 129.17V137.835H352.588V117.665H415.088C415.041 113.972 414.165 110.681 412.46 107.793C410.756 104.904 408.412 102.655 405.429 101.045C402.493 99.3883 399.108 98.5597 395.273 98.5597C391.39 98.5597 387.91 99.4356 384.832 101.188C381.755 102.892 379.316 105.236 377.517 108.219C375.718 111.154 374.771 114.492 374.676 118.233V138.759C374.676 143.209 375.552 147.116 377.304 150.477C379.056 153.792 381.542 156.372 384.761 158.219C387.981 160.065 391.816 160.989 396.267 160.989C399.345 160.989 402.138 160.562 404.648 159.71C407.157 158.858 409.311 157.603 411.111 155.946C412.91 154.289 414.259 152.253 415.159 149.838L447.048 150.761C445.722 157.911 442.811 164.137 438.312 169.44C433.862 174.696 428.014 178.792 420.77 181.727C413.526 184.616 405.145 186.06 395.628 186.06Z"
            fill="url(#paint0_linear_6_23206)"
          />
          <path
            d="M252.606 121.784V184H217.876V74.9091H250.901V94.9375H252.109C254.523 88.2614 258.643 83.0294 264.467 79.2415C270.291 75.4063 277.227 73.4886 285.276 73.4886C292.947 73.4886 299.599 75.2169 305.234 78.6733C310.916 82.0824 315.319 86.8646 318.444 93.0199C321.616 99.1278 323.179 106.277 323.131 114.469V184H288.401V121.287C288.449 115.226 286.91 110.491 283.785 107.082C280.707 103.673 276.422 101.969 270.93 101.969C267.284 101.969 264.064 102.774 261.271 104.384C258.524 105.946 256.394 108.195 254.879 111.131C253.411 114.066 252.653 117.617 252.606 121.784Z"
            fill="url(#paint1_linear_6_23206)"
          />
          <path
            d="M88.9928 0.0646798C40.8513 7.01857 3.37172 46.9186 0.182137 96.1868C-0.0606732 99.9428 -0.0607029 106.054 0.181991 109.81C3.544 161.843 45.1517 203.458 97.1779 206.818C100.933 207.061 107.044 207.061 110.799 206.818C160 203.636 199.855 166.236 206.882 118.173C207.426 114.449 204.595 111.401 200.831 111.401H170.118C166.354 111.401 162.917 114.44 161.973 118.082C155.838 141.745 135.617 159.731 110.79 162.537C107.052 162.96 100.922 162.964 97.1935 162.473C69.8599 158.873 48.0979 134.102 44.575 109.79C44.0357 106.067 44.0357 99.9278 44.5752 96.2055C47.7441 74.3446 65.666 52.1237 89.121 45.2503C92.7307 44.1925 95.7645 40.6977 95.7645 36.9331V6.12865C95.7645 2.36419 92.7168 -0.472377 88.9921 0.0656262L88.9928 0.0646798ZM112.215 6.12769V36.8354C112.215 40.5998 115.256 44.0285 118.9 44.963C140.05 50.3856 156.655 67.0769 162.012 88.2589C162.935 91.9065 166.355 94.9479 170.119 94.9479H200.862C204.626 94.9479 207.468 91.8995 206.936 88.1734C200.439 42.6479 164.484 6.63789 118.991 0.0670667C115.266 -0.471073 112.218 2.36542 112.218 6.12995L112.215 6.12769Z"
            fill="url(#paint2_linear_6_23206)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_6_23206"
              x1="454.278"
              y1="73.1606"
              x2="334.158"
              y2="178.032"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#18181B" />
              <stop offset="1" stopColor="#E4D4F4" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_6_23206"
              x1="329.898"
              y1="73.1666"
              x2="211.938"
              y2="176.401"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#18181B" />
              <stop offset="1" stopColor="#E4D4F4" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_6_23206"
              x1="220.305"
              y1="-0.603243"
              x2="-1.81896"
              y2="203.496"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#18181B" />
              <stop offset="1" stopColor="#E4D4F4" />
            </linearGradient>
          </defs>
        </motion.svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        style={{ color: "#7EE7FC" }}
      >
        By Skycraft
      </motion.div>
    </div>
  );
};

export default OneLogo;
