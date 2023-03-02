import banners from '@/mock/banner.json';
import floors from '@/mock/floor.json';
import list from '@/mock/list.json';
import Mock from 'mockjs';

Mock.mock('/mock/banner', { code: 200, data: banners });
Mock.mock('/mock/floor', { code: 200, data: floors });
Mock.mock('/mock/list', { code: 200, data: list, message: "成功", ok: true });
