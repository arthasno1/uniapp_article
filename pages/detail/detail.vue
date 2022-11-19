<template>
	<view>
		<view class="detail" v-if="loading">
			<view class="title">
				{{detaileList.title}}
			</view>
			<view class="info">
				<text>{{detaileList.author}}</text>
				<uni-dateformat :date="detaileList.postTime" format="yyyy年MM月dd日 hh:mm">
				</uni-dateformat>
			</view>
			<view class="content">
				{{detaileList.content}}
			</view>
			<view class="picurls" v-if="detaileList.picurl && detaileList.picurl.length">
				<image :src="item" mode="widthFix" v-for="item,index in detaileList.picurl" :key="index"></image>
			</view>
			<view class="btnGroup">
				<button size="mini" @click="gotoEdit">修改</button>
				<button size="mini" type="warn" @click="deleteList(detaileList._id)">删除</button>
			</view>
		</view>
		<uni-load-more status="loading" v-else></uni-load-more>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				detaileList: {},
				loading: false,
				id: ""
			};
		},
		onLoad(id) {
			console.log(id)
			this.id = id
		},
		onShow() {
			this.getDetail(this.id)
		},
		methods: {
			getDetail(id) {
				uniCloud.callFunction({
					name: "get_art_detail",
					data: id
				}).then((res) => {
					console.log(res);
					this.detaileList = res.result.data[0]
					this.loading = true
					uni.setNavigationBarTitle({
						title: this.detaileList.title
					})
				}).catch((error) => {
					uni.showToast({
						title: "获取参数失败",
						icon: 'error'
					})
				})
			},
			deleteList(id) {
				console.log(this.id);
				uni.showModal({
					title: '删除新闻',
					content: '您确定删除吗？',
					success: (res) => {
						if (res.confirm) {
							uniCloud.callFunction({
								name: 'remove_art_row',
								data: this.id
							}).then(res => {
								console.log(res.result)
								if (res.result.deleted) {
									uni.showToast({
										title: '删除成功',
										icon: "success"
									})
									setTimeout(() => {
										uni.reLaunch({
											url: "/pages/index/index"
										})
									}, 500)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			gotoEdit() {
				uni.navigateTo({
					url: '/pages/edit/edit?id=' + this.id.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		padding: 30rpx;

		.title {
			font-size: 50rpx;
			color: #000;
			text-align: justify;
			line-height: 1.4em;
		}

		.info {
			font-size: 30rpx;
			color: #666;
			padding: 30rpx 0 60rpx;

			text {
				padding: 30rpx;
			}
		}

		.content {
			font-size: 36rpx;
			line-height: 1.4em;
		}

		.btnGroup {
			padding: 50rpx 0;

			button {
				margin-right: 30rpx;
			}
		}

		.picurls {
			image {
				margin-top: 30rpx;
				width: 100%;
				display: block;
				margin-bottom: 30rpx;
			}
		}
	}
</style>
