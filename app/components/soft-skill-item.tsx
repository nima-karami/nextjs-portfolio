'use client';

import { motion } from 'motion/react';

import { SoftSkill } from './about-section';

type SoftSkillItemProps = SoftSkill;

function SoftSkillItem({ skill, level }: SoftSkillItemProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <strong>{skill}:</strong>
      <div className="border-secondary h-4 w-24 shrink-0 rounded-full border sm:w-40">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level * 20}%` }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-full rounded-full bg-gray-200"
        />
      </div>
    </div>
  );
}

export default SoftSkillItem;
