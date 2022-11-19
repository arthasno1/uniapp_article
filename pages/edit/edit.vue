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
		onLoad(id) {
			this.getDetail(id)
		},
		methods: {
			uploaderSuccess(e) {
				console.log('上传成功', e)
				this.picurl = e.tempFilePaths
				console.log('imageValue', this.imageValue)
			},
			getDetail(id) {
				uniCloud.callFunction({
					name: "get_art_detail",
					data: id
				}).then((res) => {
					console.log("res", res);
					this.formValue = res.result.data[0]
					if (!this.formValue.picurl || this.formValue.picurl.length === 0) {
						return false
					}
					let urls = this.formValue.picurl.map((item) => {
						return { url: item }
					})
					console.log("urls", urls)
					this.imageValue = urls
					console.log('imageValue', this.imageValue);
				}).catch((error) => {
					uni.showToast({
						title: "获取参数失败",
						icon: 'error'
					})
				})
			},
			submit(e) {
				console.log("imageValue", this.imageValue);
				uniCloud.callFunction({
					name: "art_edit_row",
					data: { detail: this.formValue, picurl: this.imageValue.map((item) => { return item.url }) }
				}).then(res => {
					uni.showToast({
						title: '修改成功一秒钟后跳转'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				})
			},
			isdisabled(formValue) {
				// for (let key in formValue) {
				// 	if (!formValue[key]) {
				// 		return true
				// 	}
				// }
				let bool = Object.keys(formValue).some((key, index) => {
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
