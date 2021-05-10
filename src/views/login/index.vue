<template>
  <div class="login-container">
    <el-form
      ref="loginFormComp"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
        >Login</el-button
      >

      <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span>password: any</span>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { validUsername } from '@/utils/validate';
  import type Form from 'element-plus/lib/el-form';
  import { defineComponent, nextTick, reactive, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import type { Rules } from 'async-validator';

  export default defineComponent({
    name: 'Login',
    setup() {
      const loginForm = ref({
        username: 'admin',
        password: '111111',
      });

      const validateUsername = (
        _: Rules,
        value: string,
        callback: (error: string | string[] | void) => void
      ) => {
        if (!validUsername(value)) {
          callback('Please enter the correct user name');
        } else {
          callback();
        }
      };

      const validatePassword = (
        _: Rules,
        value: string | any[],
        callback: (error: string | string[] | void) => void
      ) => {
        if (value.length < 6) {
          callback('The password can not be less than 6 digits');
        } else {
          callback();
        }
        return false;
      };

      const loginRules = reactive<any>({
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      });

      const loading = ref(false);
      const passwordType = ref('password');
      const redirect = ref('');

      const route = useRoute();
      const router = useRouter();
      watch(
        () => route.query.redirect,
        (val) => {
          redirect.value = val as string;
        },
        { immediate: true }
      );

      const loginFormComp = ref<InstanceType<typeof Form> | null>(null);
      const store = useStore();
      function handleLogin() {
        loginFormComp.value?.validate((valid) => {
          if (valid) {
            loading.value = true;
            store
              .dispatch('user/login', loginForm.value)
              .then(() => {
                router.push({ path: redirect.value || '/' });
                loading.value = false;
              })
              .catch(() => {
                loading.value = false;
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      const password = ref<HTMLInputElement | null>(null);

      function showPwd() {
        if (passwordType.value === 'password') {
          passwordType.value = '';
        } else {
          passwordType.value = 'password';
        }
        nextTick(() => {
          password.value?.focus();
        });
      }

      return { loginRules, loginForm, loading, passwordType, showPwd, handleLogin, loginFormComp };
    },
  });
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */

  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-plus css */
  .login-container {
    .el-input {
      display: inline-block;
      width: 85%;
      height: 47px;

      input {
        height: 47px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        background: transparent;
        border: 0;
        border-radius: 0;
        -webkit-appearance: none;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      color: #454545;
      background: rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    background-color: $bg;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      margin-bottom: 10px;
      font-size: 14px;
      color: #fff;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      display: inline-block;
      width: 30px;
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 26px;
        font-weight: bold;
        color: $light_gray;
        text-align: center;
      }
    }

    .show-pwd {
      position: absolute;
      top: 7px;
      right: 10px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
