document.addEventListener("DOMContentLoaded", function () {
  // 轮播图功能
  const carousel = document.querySelector(".carousel-container");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");
  let currentIndex = 0;

  function showSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  // 自动轮播
  setInterval(() => showSlide(currentIndex + 1), 5000);

  // 模态框功能
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const modalDetails = document.getElementById("modal-details");
  const modalCameraSettings = document.getElementById("modal-camera-settings");
  const closeBtn = document.getElementsByClassName("close")[0];

  console.log("Modal element:", modal);
  console.log("Close button:", closeBtn);

  // 模拟作品数据
  const portfolioData = {
    1: {
      title: "晨曦笼罩的知识殿堂",
      description:
        "晨光如薄纱般轻柔地洒落在教室里,为桌椅镀上一层金色的光晕,唤醒沉睡的书本和梦想。这一刻,知识的殿堂静谧而神圣,仿佛在等待着求知者的到来。",
      details: "拍摄时间：2023年9月1日 | 地点：辽宁工程技术大学教学楼",
      cameraSettings:
        "相机：Canon EOS R5 | 镜头：24-70mm f/2.8 | 光圈：f/4 | 快门速度：1/60秒 | ISO：400",
    },
    2: {
      title: "乡野星空之梦",
      description:
        "在齐齐哈尔宁静的乡间,夜幕低垂如墨,银河倾泻而下,宛如一条闪烁的天河。繁星点点,与远处的村落灯火遥相呼应,编织出一幅天地交融的绝美画卷。",
      details: "拍摄时间：2023年8月15日 | 地点：齐齐哈尔郊外",
      cameraSettings:
        "相机：Sony A7III | 镜头：14mm f/1.8 | 光圈：f/2.8 | 快门速度：20秒 | ISO：3200",
    },
    3: {
      title: "云朵的庄稼地幻想",
      description:
        "金黄的玉米田上方,一朵巨大的云彩如梦似幻地漂浮着。它形态万千,仿佛是大地的想象力在天空中绽放。阳光穿透云层,为这幅自然的杰作增添了神奇的光影效果。",
      details: "拍摄时间：2023年7月20日 | 地点：黑龙江省某玉米田",
      cameraSettings:
        "相机：Fujifilm X-T4 | 镜头：16-55mm f/2.8 | 光圈：f/11 | 快门速度：1/250秒 | ISO：200",
    },
  };

  let scrollPosition;

  // 禁用页面滚动
  function disableScroll() {
    scrollPosition = window.pageYOffset;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
  }

  // 启用页面滚动
  function enableScroll() {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollPosition);
  }

  // 为每个作品项添加点击事件
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  console.log("Portfolio items:", portfolioItems.length);

  portfolioItems.forEach((item) => {
    item.addEventListener("click", function () {
      console.log("Portfolio item clicked");
      const id = this.getAttribute("data-id");
      console.log("Item ID:", id);
      const data = portfolioData[id];
      console.log("Item data:", data);

      if (data) {
        modalTitle.textContent = data.title;
        modalImage.src = this.querySelector("img").src;
        modalImage.alt = data.title;
        modalDescription.textContent = data.description;
        modalDetails.textContent = data.details;
        modalCameraSettings.textContent = data.cameraSettings;

        modal.style.display = "block";
        disableScroll(); // 禁用滚动
      } else {
        console.error("No data found for ID:", id);
      }
    });
  });

  // 关闭模态框
  closeBtn.onclick = function () {
    modal.style.display = "none";
    enableScroll(); // 启用滚动
  };

  // 点击模态框外部关闭
  modal.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      enableScroll(); // 启用滚动
    }
  };

  // 添加调试信息
  console.log("Script loaded");
  console.log(
    "Portfolio items:",
    document.querySelectorAll(".portfolio-item").length
  );

  // 登录功能
  const loginBtn = document.getElementById("login-btn");
  const loginModal = document.getElementById("login-modal");
  const loginForm = document.getElementById("login-form");
  const loginCloseBtn = loginModal.querySelector(".close");

  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    loginModal.style.display = "block";
    disableScroll();
  });

  loginCloseBtn.addEventListener("click", function () {
    loginModal.style.display = "none";
    enableScroll();
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "wuenen" && password === "322113") {
      alert("登录成功！");
      loginModal.style.display = "none";
      enableScroll();
      enableAdminMode();
    } else {
      alert("用户名或密码错误！");
    }
  });

  function enableAdminMode() {
    // 为每个作品项添加编辑按钮
    portfolioItems.forEach((item) => {
      const editBtn = document.createElement("button");
      editBtn.textContent = "编辑";
      editBtn.classList.add("edit-btn");
      editBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const id = item.getAttribute("data-id");
        editPortfolioItem(id);
      });
      item.appendChild(editBtn);
    });

    // 添加"添加新作品"按钮
    const addNewBtn = document.createElement("button");
    addNewBtn.textContent = "添加新作品";
    addNewBtn.id = "add-new-btn";
    addNewBtn.addEventListener("click", addNewPortfolioItem);
    document.querySelector(".portfolio-grid").appendChild(addNewBtn);
  }

  function editPortfolioItem(id) {
    const data = portfolioData[id];
    // 这里可以实现编辑功能，例如打开一个编辑模态框
    console.log("编辑作品：", data);
  }

  function addNewPortfolioItem() {
    // 这里可以实现添加新作品的功能，例如打开一个添加模态框
    console.log("添加新作品");
  }

  // 添加调试信息
  console.log("Script loaded");
  console.log(
    "Portfolio items:",
    document.querySelectorAll(".portfolio-item").length
  );

  // 将这段代码移到文件末尾
  const wechatIcon = document.getElementById("wechat-icon");
  if (wechatIcon) {
    wechatIcon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      alert("我的微信号: Coisini_622TZzs");
      console.log("微信图标被点击");
    });
    console.log("微信图标事件监听器已添加");
  } else {
    console.error("未找到微信图标元素");
  }

  // 添加调试信息
  console.log("Script loaded");
  console.log(
    "Portfolio items:",
    document.querySelectorAll(".portfolio-item").length
  );
});
