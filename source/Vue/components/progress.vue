<template>
    <div class="donut">
        <div :id=this.name class="donut-size">
        <div class="pie-wrapper">
            <span class="label">
                <span class="num">0</span><span class="smaller">%</span>
            </span>
            <div class="pie">
            <div class="left-side half-circle"></div>
            <div class="right-side half-circle"></div>
            </div>
            <div class="shadow"></div>
        </div>
        </div>
    </div>
</template>

<script>
import JQuery from 'jquery'

function updateDonutChart (el, percent, donut) {
            percent = Math.round(percent);
            if (percent > 100) {
                percent = 100;
            } else if (percent < 0) {
                percent = 0;
            }
            var deg = Math.round(360 * (percent / 100));

            if (percent > 50) {
                JQuery(el + ' .pie').css('clip', 'rect(auto, auto, auto, auto)');
                JQuery(el + ' .right-side').css('transform', 'rotate(180deg)');
            } else {
                JQuery(el + ' .pie').css('clip', 'rect(0, 1em, 1em, 0.5em)');
                JQuery(el + ' .right-side').css('transform', 'rotate(0deg)');
            }
            if (donut) {
                JQuery(el + ' .right-side').css('border-width', '0.1em');
                JQuery(el + ' .left-side').css('border-width', '0.1em');
                JQuery(el + ' .shadow').css('border-width', '0.1em');
            } else {
                JQuery(el + ' .right-side').css('border-width', '0.5em');
                JQuery(el + ' .left-side').css('border-width', '0.5em');
                JQuery(el + ' .shadow').css('border-width', '0.5em');
            }
            JQuery(el + ' .num').text(percent);
            JQuery(el + ' .left-side').css('transform', 'rotate(' + deg + 'deg)');
        }

export default {
    name: 'progress-circle',
        data () {
            return {
                progresscircle: ''
            }
        },
    props: ['name', 'percent'],
    mounted: function() {
        updateDonutChart('#' + this.name, this.percent, true);
    } 
    
}
</script>

<style lang="sass" scoped>

$pie-main: hsl(168, 76%, 42%)
$pie-text: #7F8C8D
$pie-shadow: #BDC3C7

.donut-size
    font-size: 12em

.donut
    width: 80px

.pie-wrapper
    position: relative
    width: 1em
    height: 1em
    margin: 0px auto
    .pie
        position: absolute
        top: 0px
        left: 0px
        width: 100%
        height: 100%
        clip: rect(0, 1em, 1em, 0.5em)
    .half-circle
        position: absolute
        top: 0px
        left: 0px
        width: 100%
        height: 100%
        border: 0.1em solid $pie-main
        border-radius: 50%
        clip: rect(0em, 0.5em, 1em, 0em)
    .right-side
        transform: rotate(0deg)
    .label
        position: absolute
        top: 0.52em
        right: 0.4em
        bottom: 0.4em
        left: 0.4em
        display: block
        background: none
        border-radius: 50%
        color: $pie-text
        font-size: 0.25em
        line-height: 2.6em
        text-align: center
        cursor: default
        z-index: 2
    .smaller
        padding-bottom: 20px
        color: $pie-shadow
        font-size: .45em
        vertical-align: super
    .shadow
        width: 100%
        height: 100%
        border: 0.1em solid $pie-shadow
        border-radius: 50%
</style>