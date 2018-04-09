
//
// Based on https://github.com/kottenator/jquery-circle-progress
//

<template>
    <div :id=this.name class="circle">
        <strong></strong>
        <span>
            <slot>Value</slot>
        </span>
    </div>
</template>

<script>
import 'jquery-circle-progress'
import $ from 'jquery'

export default {
    name: 'circle-progress',
        data () {
            return {
            }
        },
    props: ['name', 'percent'],
    mounted: function() {
        $('#' + this.name).circleProgress({
            value: this.percent/100,
            size: 80,
            fill: {
                color: '#ff715b'
            },
            thickness: 3
        }).on('circle-animation-progress', function(event, progress, stepValue) {
             $(this).find('strong').html(Math.round(100 * stepValue.toFixed(2).substr(1)) + '<i>%</i>');
        });
    }
}
</script>

<style>

.circle {
  margin: 6px 6px 20px;
  display: inline-block;
  position: relative;
  text-align: center;
  line-height: 1.2;
}

.circle canvas {
  vertical-align: top;
}

.circle strong {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
}

.circle strong i {
  font-style: normal;
  font-size: 0.6em;
  font-weight: normal;
}

.circle span {
  display: block;
  color: #aaa;
  margin-top: 12px;
  font-size: 14px
}

</style>

