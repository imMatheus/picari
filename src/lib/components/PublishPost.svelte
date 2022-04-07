<script lang="ts">
	let srcObject: MediaStream;
	async function getCamera() {
		let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
		srcObject = stream;
	}
</script>

<div class="bg-red-800">
	hej
	<!-- <video id="video" width="320" height="240" {srcObject} /> -->
	<button />
</div>
