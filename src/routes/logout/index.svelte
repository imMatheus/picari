<script>
	import { onMount } from 'svelte';
	import { auth } from '../../lib/firebase/config';
	import { signOut } from 'firebase/auth';
	import Loader from '$components/Loader.svelte';

	onMount(async () => {
		localStorage.removeItem('user');
		await signOut(auth);
		location.href = './';
	});
</script>

<Loader />
<!-- centered text -->
<div class="text-center">
	<h1 class="text-2xl">Logging out...</h1>
</div>
