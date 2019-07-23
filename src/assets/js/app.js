export default {
	name: "App",
	components: {},
	data() {
		return {
			year: (new Date).getFullYear(),
			screenWidth: document.body.clientWidth,

			dialogSignIN: false,
			dialogSignUP: false,
			validIN: false,
			validUP: false,
			email: '',
			password: '',
			confirmPassword: '',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+/.test(v) || 'E-mail must be valid'
			],
			passwordRules: [
				v => !!v || 'Password is required',
				v => (v && v.length >= 6) || 'Password must be at least 6 characters'
			],
			confirmPasswordRules: [
				v => !!v || 'Password is required',
				v => (v === this.password) || 'Password does not match'
			],

			drawer: false,
			links: [{
					title: "Discover",
					url: "/discover"
				},
				{
					title: "Articles",
					url: "/articles"
				},
				{
					title: "Exhibitions",
					url: "/exhibitions"
				},
				{
					title: "Partners",
					url: "/partners"
				}
			],

			footLinks: [{
					title: "About",
					url: "/about"
				},
				{
					title: "Partners",
					url: "/partners"
				},
				{
					title: "FAQ",
					url: "/faq"
				},
				{
					title: "Contact",
					url: "/contact"
				},
				{
					title: "Privacy",
					url: "/privacy"
				},
				{
					title: "Terms",
					url: "/terms"
				},
				{
					title: "Photography Competition",
					url: "/photo_contest"
				},
			],

			socLinks: [{
					icon: "fab fa-facebook",
					color: '#5f7ec1',
					url: 'https://www.facebook.com/GuruShots'
				},
				{
					icon: "fab fa-twitter",
					color: '#3bc9ff',
					url: 'https://twitter.com/GuruShots'
				},
				{
					icon: "fab fa-instagram",
					color: '#9b6954',
					url: 'https://instagram.com/GuruShots'
				},
				{
					icon: "fab fa-youtube",
					color: '#e9272d',
					url: 'https://youtube.com/GuruShots'
				}
			],
		};
	},
	methods: {
		inSubmit() {
			if (this.$refs.formIN.validate()) {
				const user = {
					email: this.email,
					password: this.password
				}
				this.$http.post('http://localhost:3000/api/users/in', user);
				// console.log(user);
			}
		},
		upSubmit() {
			if (this.$refs.formUP.validate()) {
				const user = {
					email: this.email,
					password: this.password
				}
				this.$http.post('http://localhost:3000/api/users/up', user);
				// console.log(user);
			}
		},
		resetForm() {
			this.$refs.formIN.reset();
			this.$refs.formIN.resetValidation();
			this.$refs.formUP.reset();
			this.$refs.formUP.resetValidation();
		},
		modalSwitch() {
			this.dialogSignIN = !this.dialogSignIN;
			this.dialogSignUP = !this.dialogSignUP;
		},
	},
};