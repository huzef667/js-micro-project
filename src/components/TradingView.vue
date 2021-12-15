<template>
  <div :id="container_id"></div>
</template>

<script>
const SCRIPT_ID = "tradingview-widget-script";
const CONTAINER_ID = "vue-trading-view";
export default {
  name: "VueTradingView",
  data() {
    return {
      container_id: CONTAINER_ID,
    };
  },
  props: {
    options: Object,
  },
  methods: {
    canUseDOM() {
      return (
        typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
      );
    },
    getScriptElement() {
      return document.getElementById(SCRIPT_ID);
    },
    updateOnloadListener(onload) {
      const script = this.getScriptElement();
      const oldOnload = script.onload;
      return (script.onload = () => {
        oldOnload();
        onload();
      });
    },
    scriptExists() {
      return this.getScriptElement() !== null;
    },
    appendScript(onload) {
      if (!this.canUseDOM()) {
        onload();
        return;
      }
      if (this.scriptExists()) {
        if (typeof TradingView === "undefined") {
          this.updateOnloadListener(onload);
          return;
        }
        onload();
        return;
      }
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://s3.tradingview.com/tv.js";
      script.onload = onload;
      document.getElementsByTagName("head")[0].appendChild(script);
    },
    initWidget() {
      if (typeof TradingView === "undefined") {
        return;
      }

      new window.TradingView.MediumWidget({
        symbols: [[this.options.symbol]],
        chartOnly: false,
        width: 1000,
        height: 400,
        locale: "en",
        colorTheme: "dark",
        gridLineColor: "rgba(240, 243, 250, 0)",
        fontColor: "#787B86",
        isTransparent: false,
        autosize: false,
        showFloatingTooltip: true,
        showVolume: false,
        scalePosition: "no",
        scaleMode: "Normal",
        fontFamily: "Trebuchet MS, sans-serif",
        noTimeScale: false,
        chartType: "area",
        lineColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0)",
        topColor: "rgba(41, 98, 255, 0.3)",
        container_id: this.container_id,
      });
    },
  },
  mounted() {
    this.appendScript(this.initWidget);
  },
};
</script>
