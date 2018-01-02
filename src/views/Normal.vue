<template lang="pug">
  .container
    ElForm(:model="ruleForm",:rules="rules",ref="ruleForm")
      section(v-for="(sec,secIdx) in this.$store.state.tpl",:key="secIdx")
        h2 {{sec.name}}
        ElFormItem(v-if="sec.value !== 'section'",v-for="(item,itemIdx) in sec.content",:key="itemIdx",:label="item.title",label-width="200px",:prop="sec.value+'_'+item.value") 
          ElCheckboxGroup(v-if="item.type === 'checkbox'",v-model="ruleForm[sec.value+'_'+item.value]")
            ElCheckbox(v-for="(text,cbIdx) in item.children",:key="cbIdx",:label="text",v-model="ruleForm[sec.value+'_'+item.value]")
          ElSwitch(v-else-if="item.type === 'radio'",v-model="ruleForm[sec.value+'_'+item.value]")
          ElInput(v-else,:placeholder="item.placeholder?item.placeholder:''",v-model="ruleForm[sec.value+'_'+item.value]",:disabled="getInputIsDisabled(sec.value)")
          span.tips(v-if="item.remark") {{item.remark}}

      h2 分段内容
      section(v-for="(sec,secIdx) in ruleForm.section",:key="secIdx")
        h3 {{sec.title?sec.title:'标题栏'}}
          ElButton(:plain="true",type="danger",@click="delData('section',secIdx)") del
        ElFormItem(v-for="(item,key) in sec",:key="key",:label="sectionTpl[key].title",label-width="200px",:required="sectionTpl[key].require")
          ElFormItem(v-if="key !== 'journey'",:rules="rules['section_'+key]",:prop="'section.'+secIdx+'.'+key")
            ElInput(:placeholder="sectionTpl[key].placeholder?sectionTpl[key].placeholder:''",v-model="sec[key]")
            span.tips(v-if="sectionTpl[key].remark") {{sectionTpl[key].remark}}
          div.section-journey-box(v-else,v-for="(jItem,jIdx) in item",:key="jIdx")
            div.section-journey-input
              template(v-for="(val,jKey,idx) in jItem")
                ElFormItem(v-if="jKey === 'id'",:rules="sectionIdRules",:prop="'section.'+secIdx+'.'+key+'.'+jIdx+'.'+jKey")
                  ElInput(:placeholder="jKey",v-model.number="jItem[jKey]")
                ElInput(v-else,:placeholder="jKey",v-model="jItem[jKey]")
            ElButton(v-if="item.length > 1",:plain="true",type="danger",@click="delData('journey',secIdx,jIdx)") del
        ElButton(@click="addData('journey',secIdx)",class="margin-label") add
      section(class="add-more")  
        ElButton(type="primary",@click="addData('section')",plain) add a new section

    footer
      div
        ElButton(type="primary",@click="autoFillForm") 填充模拟数据
      div
        ElButton(type="primary",@click="submitForm('ruleForm')") 提交表单
        ElButton(:disabled="!flag.isHasData",type="primary",@click="getResData()") 预览（后台请求数据）
        ElButton(:disabled="!flag.isPreviewed",:loading="flag.isGenerating",type="primary",@click="generatePage()") 生成页面
        ElButton(:disabled="!flag.isGenerated",type="primary",@click="openPage(`http://localhost:${devConfig.port}/${devConfig.assetsSubDirectory}/${ruleForm.info_name || 'test'}.html`)") 检查已生成页面
        p 填写表单 ➡ 提交表单 ➡ 预览（后台请求数据）➡ 生成页面 ➡ 查看生成的页面
      
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import { dev as devConfig } from '../../config';

export default {
  data() {
    return {
      cloneJourneyData: {},
      cloneSectionData: {},
      sectionIdRules: {
        required: true,
        message: 'id必填,只能填数字',
        trigger: 'blur',
        type: 'number'
      },
      devConfig: devConfig,
      flag: {
        isHasData: false,
        isPreviewed: false,
        isGenerating: false,
        isGenerated: false
      }
    };
  },
  created() {
    let pattern = (param, ...key) => {
      return {
        [key.join('_')]: {
          ...(param.require && { required: true }),
          ...(param.message && { message: param.message }),
          ...(param.type && {
            type:
              param.type === 'radio'
                ? 'boolean'
                : param.type === 'checkbox' ? 'array' : param.type
          }),
          ...(param.pattern && { pattern: new RegExp(param.pattern) }),
          ...(param.value === 'color' && { len: 6 })
        }
      };
    };

    const _rules = arr =>
      arr.reduce((obj, key) => {
        return key.content.reduce((o, child) => {
          child.children &&
            child.type !== 'checkbox' &&
            child.children.reduce((thirdObj, third) => {
              return Object.assign(
                obj,
                pattern(third, key.value, child.value, third.value)
              );
            }, {});
          return Object.assign(obj, pattern(child, key.value, child.value));
        }, {});
      }, {});

    const _section = obj =>
      Object.keys(obj).reduce((o, key) => {
        return obj[key].children
          ? Object.keys(obj[key].children).reduce((thirdObj, third) => {
            return Object.assign(
              o,
              pattern(obj[key].children[third], 'section', key, third)
            );
          }, {})
          : Object.assign(o, pattern(obj[key], 'section', key));
      }, {});

    this.rules = Object.assign(
      _rules(this.$store.state.tpl),
      _section(this.$store.state.config.section.content)
    );

    this.cloneJourneyData = this.shallowClone(
      this.ruleForm.section[0].journey[0]
    );
    this.cloneSectionData = this.shallowClone(this.ruleForm.section[0]);
  },
  mounted() {
    // if(this.cacheData && window){
    //   if(window.confirm('存在上次使用数据，是否恢复')){
    //     this.$store.dispatch("setValue",this.cacheData.data);
    //   }
    // }
  },
  computed: {
    ...mapState({
      ruleForm: state => state.data,
      sectionTpl: state => state.config.section.content
    })
  },
  methods: {
    ...mapActions(['setValue']),
    // ...mapActions({
    //   autoFillForm: "setAutoValue"
    // }),
    getInputIsDisabled(key) {
      return this.ruleForm.hasOwnProperty(key + '_exist')
        ? !this.ruleForm[key + '_exist']
        : false;
    },
    submitForm(formName) {
      console.log(this);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
          this.flag.isHasData = true;
          console.log(this.flag);
          console.log(this.ruleForm);
          this.$store.dispatch('setValue', this.ruleForm);
          // this.setValue(this.ruleForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addData(param, idx) {
      switch (param) {
        case 'section':
          this.ruleForm.section.push(this.shallowClone(this.cloneSectionData));
          break;
        case 'journey':
          this.ruleForm.section[idx].journey.push(
            this.shallowClone(this.cloneJourneyData)
          );
          break;
      }
    },
    delData(param, idx, jIdx) {
      switch (param) {
        case 'section':
          this.ruleForm.section.splice(idx, 1);
          break;
        case 'journey':
          this.ruleForm.section[idx].journey.splice(jIdx, 1);
          break;
      }
    },
    shallowClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    generatePage() {
      this.flag.isGenerating = true;
      axios
        .get('/app/generate')
        .then(res => {
          res.data.code === 1 && this.alertText(res.data.msg);
          this.flag.isGenerating = false;
          this.flag.isGenerated = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openPage(link) {
      window && window.open(link);
    },
    autoFillForm() {
      this.$store.dispatch('setAutoValue');
    },
    alertText(msg) {
      window && window.alert(msg);
    },
    getResData() {
      this.$store
        .dispatch('getResData')
        .then(res => {
          console.log(res);
          if (res) {
            this.openPage(
              `http://localhost:${devConfig.port}/${devConfig.outputName}`
            );
            this.alertText('在打开的页面中完成预览，确认后生成页面');
            this.flag.isPreviewed = true;
          } else {
            this.alertText('id为空');
          }
        })
        .catch(err => {
          console.log('e', err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #f2f2f2;
  div:last-child {
    text-align: right;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #999;
  }
}

section {
  margin: 0 auto 100px;
  width: 700px;
}

h2 {
  padding: 10px 0;
  width: 200px;
  color: #58b7ff;
  text-align: center;
}

h3 {
  text-align: center;
  button {
    float: right;
  }
}

span.tips {
  color: #999;
  font-size: 12px;
}

.section-journey-box {
  display: flex;
  margin: 0 10px 10px 0;
  width: 100%;
  .section-journey-input {
    display: flex;
    justify-content: space-between;
    width: 210px;
    div {
      max-width: 100px;
    }
  }
  button {
    margin-left: 10px;
  }
}
.add-more {
  text-align: center;
}
.margin-label {
  margin-left: 200px;
}
</style>
