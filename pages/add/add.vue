<template>
	<view class="add">
		<form @submit="submit">
			<view class="item">
				<input name="title" focus placeholder="请输入标题" v-model="formValue.title" />
			</view>
			<view class="item">
				<input name="author" placeholder="请输入作者" v-model="formValue.content" />
			</view>
			<view class="item">
				<textarea name="content" placeholder="请输入详细内容" maxlength="-1" v-model="formValue.author" />
			</view>
			<view class="item">
				<uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" @success="uploaderSuccess"
					limit="3" title="最多选择3张" />
			</view>
			<view class="item">
				<button form-type="reset">重置</button>
				<button form-type="submit" type="primary" :disabled="isdisabled(formValue)">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formValue: {
					title: "",
					author: "",
					content: "",
				},
				imageValue: [],
				picurl: []
			}
		},
		methods: {
			uploaderSuccess(e) {
				console.log('上传成功', e)
				this.picurl = e.tempFilePaths
			},
			submit(e) {
				let detail = e.detail.value
				uniCloud.callFunction({
					name: 'art_add_row',
					data: { detail, picurl: this.picurl }
				}).then(res => {
					uni.showToast({
						title: '添加成功'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 1000)
				})
				this.formValue = {}
			},
			isdisabled(formValue) {
				// 安卓客户端兼容问题改用Object.keys循环
				// for (let key in formValue) {
				// 	if (!formValue[key]) {
				// 		return true
				// 	}
				// }
				let bool = Object.keys(formValue).some((key, index) => {
					console.log(formValue[key]);
					return formValue[key] === ""
				})
				return bool
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add {
		padding: 30rpx;

		.item {
			padding-bottom: 20rpx;

			input,
			textarea {
				border: 1rpx solid #eee;
				height: 80rpx;
				padding: 0 20rpx;
			}

			textarea {
				width: 100%;
				height: 200rpx;
				box-sizing: border-box;
			}

			button {
				margin-bottom: 20rpx;
			}
		}
	}
</style>
