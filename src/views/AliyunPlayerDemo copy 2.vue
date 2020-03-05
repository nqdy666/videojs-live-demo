<template>
    <div id="app">
        <VueAliplayerV2
            @ready="handleReady" 
            ref="VueAliplayerV2" 
            id="player-1194076936807171180" 
            :options="options"></VueAliplayerV2>
    </div>
</template>
<script>
import VueAliplayerV2 from './VueAliplayer';
export default {
  name: 'dsf',
    data(){
        return {
            options: {  //配置项  
                source:'rtmp://182.112.15.258:1688/hls/1194076936807171180'
            }
        }
    },
    methods: {
      handleReady () {

      }
    },
    components:{ VueAliplayerV2: VueAliplayerV2 }
}
</script>