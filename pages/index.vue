<template>
    <div class="age-calculator bg-Off-white min-h-screen py-5">
        <div class="container px-2 grid place-items-center min-h-screen">
            <div
                class="calc-box rounded-2xl shadow-md shadow-slate-200 rounded-br-[90px] md:p-10 py-14 px-5 bg-White md:w-[600px] w-full">
                <form class="flex items-start gap-5">
                    <label>
                        <span class="block font-bold mb-2 text-xs uppercase tracking-widest"
                            :class="errors.day ? 'text-Light-red' : 'text-Smokey-grey'">
                            Day
                        </span>
                        <input type="text" maxlength="2"
                            class="md:w-32 w-full p-3 px-4 rounded-md md:text-2xl text-md font-bold placeholder:font-bold placeholder:text-Smokey-grey border border-Light-grey focus:border-Purple caret-Purple"
                            :class="errors.day ? 'border-Light-red' : ''" placeholder="DD" v-model="day"
                            @input="dayNumberOnly" @change="formatDay">
                        <span class="text-Light-red italic text-xs block mt-2">
                            {{ errors.day }}
                        </span>
                    </label>
                    <label>
                        <span class="block font-bold mb-2 text-xs uppercase tracking-widest"
                            :class="errors.month ? 'text-Light-red' : 'text-Smokey-grey'">
                            Month
                        </span>
                        <input type="text" maxlength="2"
                            class="md:w-32 w-full p-3 px-4 rounded-md md:text-2xl text-md font-bold placeholder:font-bold placeholder:text-Smokey-grey border border-Light-grey"
                            :class="errors.month ? 'border-Light-red' : ''" placeholder="MM" v-model="month"
                            @input="monthNumberOnly" @change="formatMonth">
                        <span class="text-Light-red italic text-xs block mt-2">
                            {{ errors.month }}
                        </span>
                    </label>
                    <label>
                        <span class="block font-bold mb-2 text-xs uppercase tracking-widest"
                            :class="errors.year ? 'text-Light-red' : 'text-Smokey-grey'">
                            Year
                        </span>
                        <input type="text" maxlength="4"
                            class="md:w-32 w-full p-3 px-4 rounded-md md:text-2xl text-md font-bold placeholder:font-bold placeholder:text-Smokey-grey border border-Light-grey"
                            :class="errors.year ? 'border-Light-red' : ''" placeholder="YYYY" v-model="year"
                            @input="yearNumberOnly">
                        <span class="text-Light-red italic text-xs block mt-2">
                            {{ errors.year }}
                        </span>
                    </label>
                </form>
                <div class="separator md:py-1 py-14 text-end flex items-center relative">
                    <div class="border border-Off-white rounded-full flex-grow"></div>
                    <button @click.prevent="onSubmit"
                        class="md:ms-auto arrow-btn outline-none cursor-pointer w-16 h-16 rounded-full bg-Purple grid place-items-center transition ease-in-out duration-300 hover:bg-Off-black md:relative absolute md:inset-0 inset-1/2 md:translate-x-0 -translate-x-1/2 md:translate-y-0 -translate-y-1/2">
                        <img src="assets/images/icon-arrow.svg" class="w-8" alt="">
                    </button>
                </div>
                <div class="age-data mt-5 md:text-7xl text-5xl italic font-black flex flex-col gap-2">
                    <div class="flex items-center gap-3">
                        <h1 class="text-Purple tracking-widest">
                            {{ birthDate.year !== '' ? birthDate.year : '--' }}
                        </h1>
                        <h1 class="text-Off-black">years</h1>
                    </div>
                    <div class="flex items-center gap-3">
                        <h1 class="text-Purple tracking-widest">
                            {{ birthDate.month !== '' ? birthDate.month : '--' }}
                        </h1>
                        <h1 class="text-Off-black">months</h1>
                    </div>
                    <div class="flex items-center gap-3">
                        <h1 class="text-Purple tracking-widest">
                            {{ birthDate.day !== '' ? birthDate.day : '--' }}
                        </h1>
                        <h1 class="text-Off-black">days</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import * as yup from 'yup';
import { useForm, } from 'vee-validate';



const birthDate = ref({
    day: '',
    month: '',
    year: ""
})

const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: yup.object({
        day: yup
            .string()
            .required('This field is required')
            .min(2, 'Day must be at least 2 digits')
            .max(2, 'Day must be at most 2 digits')
            .test('day-range', 'Must be a valid day', (value) => {
                return value >= 1 && value <= 31;
            }),
        month: yup
            .string()
            .required('This field is required')
            .min(2, 'Month must be at least 2 digits')
            .max(2, 'Month must be at most 2 digits')
            .test('month-range', 'Must be a valid month', (value) => {
                return value >= 1 && value <= 12;
            }),
        year: yup
            .string()
            .required('This field is required')
            .min(4, 'Year must be at least 4 digits')
            .max(4, 'Year must be at most 4 digits')
            .test('year-range', 'Must be in the past', (value) => {
                return value <= new Date().getFullYear();
            }),
    }),
    initialValues: {
        day: '',
        month: '',
        year: '',
    },
});

const [day] = defineField('day')
const [month] = defineField('month')
const [year] = defineField('year')

const onSubmit = handleSubmit(values => {
    const today = new Date()

    birthDate.value.day = new Date().getDate() - values.day
    birthDate.value.month = (new Date().getMonth() + 1) - values.month
    birthDate.value.year = new Date().getFullYear() - values.year

    if (birthDate.value.month < 0 || (birthDate.value.month === 0 && today.getDate() < values.day)) {
        birthDate.value.year--;
        birthDate.value.month += 12;
    }

    if (birthDate.value.day < 0) {
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        birthDate.value.day = lastMonth.getDate() - values.day + today.getDate();
        birthDate.value.month--;
    }
    resetForm()

});




const dayNumberOnly = (event) => {
    if ((+day.value).toString() === "NaN") day.value = ''
}
const monthNumberOnly = (event) => {
    if ((+month.value).toString() === "NaN") month.value = ''
}
const yearNumberOnly = (event) => {
    if ((+year.value).toString() === "NaN") year.value = ''
}

const formatDay = (event) => {
    if (day.value.length === 1) day.value = `0${event.target.value}`
}
const formatMonth = (event) => {
    if (event.target.value.length === 1) month.value = `0${event.target.value}`
}





</script>

<style lang="scss" scoped></style>