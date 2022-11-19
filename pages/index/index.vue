<template>
	<view class="home">
		<view class="content">
			<view @click="toDetail(item._id)" class="item" v-for="item,index in listArr" :key="item._id">
				<view class="text">
					<view class="title">
						{{item.title}}
					</view>
					<view class="info">
						<text>{{item.author}}</text>
						<uni-dateformat :date="item.postTime" locale="zh" format='MM-dd hh:mm'
							:threshold="[60000, 3600000]">
						</uni-dateformat>
					</view>
				</view>
				<view class="pic">
					<image mode="aspectFill" v-if="item.picurl&&item.picurl.length!==0" :src="item.picurl[0]">
					</image>
					<image mode="aspectFill" v-else src="../../static/images/nopic.jpg">
					</image>
				</view>
			</view>
		</view>
		<view class="goAdd" @click="goAdd">
			<uni-icons type="plusempty" size="30" color="white"></uni-icons>
		</view>
	</view>
</template>

<script>
	import { nextTick } from "vue"
	export default {
		data() {
			return {
				listArr: []
			}
		},
		onPullDownRefresh() {
			this.listArr = []
			this.getData()

		},
		onLoad() {
			this.getData()
		},
		onReachBottom() {
			this.getData()
		},
		methods: {
			goAdd() {
				uni.navigateTo({
					url: `/pages/add/add`
				})
			},
			getData() {
				uniCloud.callFunction({
					name: "get_art_all",
					data: { skip: this.listArr.length }
				}).then(res => {
					console.log(res.result);
					let oldList = this.listArr
					let newList = [...oldList, ...res.result.data]
					this.listArr = newList
					uni.stopPullDownRefresh()
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {

		.content {
			padding: 30rpx;

			.item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eee;

				.text {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 20rpx;

					.title {
						font-size: 36rpx;
						text-align: justify;
						color: #333;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						line-height: 40rpx;
					}

					.info {
						font-size: 28rpx;
						color: #888;

						text {
							padding-right: 20rpx;
						}
					}
				}

				.pic {
					width: 260rpx;
					height: 180rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.goAdd {
			width: 100rpx;
			height: 100rpx;
			color: #fff;
			background-color: #379243;
			border-radius: 50%;
			display: flex;
			font-size: 60rpx;
			justify-content: center;
			align-items: center;
			position: fixed;
			right: 60rpx;
			bottom: 100rpx;
			box-shadow: 6rpx 6rpx 20rpx #333;
		}
	}
</style>
