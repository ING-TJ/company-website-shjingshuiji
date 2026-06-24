(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", function (event) {
      if (event.target && event.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var canvas = document.querySelector("[data-water-canvas]");
  if (!canvas) {
    return;
  }

  var context = canvas.getContext("2d");
  var mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var animationId = 0;
  var points = [];

  function resize() {
    var rect = canvas.getBoundingClientRect();
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    createPoints(rect.width, rect.height);
    draw(performance.now());
  }

  function createPoints(width, height) {
    points = [];
    var columns = Math.max(5, Math.floor(width / 150));
    var rows = Math.max(4, Math.floor(height / 120));
    for (var row = 0; row <= rows; row += 1) {
      for (var column = 0; column <= columns; column += 1) {
        points.push({
          x: (column / columns) * width,
          y: (row / rows) * height,
          drift: (row + column) * 0.7,
        });
      }
    }
  }

  function draw(time) {
    var rect = canvas.getBoundingClientRect();
    var width = rect.width;
    var height = rect.height;
    context.clearRect(0, 0, width, height);

    var gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.16)");
    gradient.addColorStop(0.5, "rgba(94, 167, 154, 0.16)");
    gradient.addColorStop(1, "rgba(234, 217, 191, 0.12)");

    context.lineWidth = 1;
    context.strokeStyle = gradient;
    context.beginPath();
    for (var i = 0; i < points.length; i += 1) {
      var p = points[i];
      var x = p.x + Math.sin(time / 3200 + p.drift) * 10;
      var y = p.y + Math.cos(time / 3600 + p.drift) * 8;
      if (i % 2 === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.stroke();

    context.lineWidth = 1.4;
    for (var wave = 0; wave < 4; wave += 1) {
      context.beginPath();
      context.strokeStyle = wave % 2 === 0 ? "rgba(255,255,255,0.22)" : "rgba(94,167,154,0.22)";
      for (var xPos = -20; xPos <= width + 20; xPos += 18) {
        var yPos =
          height * (0.24 + wave * 0.16) +
          Math.sin(xPos / 95 + time / (2400 + wave * 280)) * (16 + wave * 4);
        if (xPos === -20) {
          context.moveTo(xPos, yPos);
        } else {
          context.lineTo(xPos, yPos);
        }
      }
      context.stroke();
    }

    points.forEach(function (p, index) {
      if (index % 4 !== 0) {
        return;
      }
      var radius = 1.8 + Math.sin(time / 1500 + p.drift) * 0.8;
      context.beginPath();
      context.fillStyle = "rgba(248, 251, 248, 0.34)";
      context.arc(p.x, p.y, Math.max(0.7, radius), 0, Math.PI * 2);
      context.fill();
    });

    if (!mediaQuery.matches) {
      animationId = window.requestAnimationFrame(draw);
    }
  }

  window.addEventListener("resize", resize);
  resize();
})();
